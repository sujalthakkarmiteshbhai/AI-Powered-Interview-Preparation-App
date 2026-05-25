  /* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert , LuCornerRightDown, LuListCollapse  } from "react-icons/lu";
import { SpinnerLoader } from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import { RoleInfoHeader }from "../InterviewPrep/RoleInfoHeader";
import  DashboardLayout  from "../../components/layouts/DashboardLayout";
import  axiosInstance  from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { QuestionsCards } from "../../components/cards/QuestionsCards";
import { SkeletonLoader } from '../../components/loader/SkeletonLoader';
import Drawer from '../../components/Drawer';
import  AIResponsePReview from '../../pages/InterviewPrep/AIResponsePReview';


const InterviewPrep = () => {
  const { sessionId } = useParams();  

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if (response.data?.session) {
        setSessionData(response.data.session);
        setErrorMsg("");
      } else if (response.data?.message) {
        setErrorMsg(response.data.message);
      } else {
        setErrorMsg("Failed to fetch session details. Please try again.");
      }
    } catch (err) {
      console.error("ERROR OCCURED", err);
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Failed to fetch session details. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  

  // Generate Concept Explanation
  const generateConceptExplanation = async (question )=>{
         try{
          setErrorMsg("");
          setExplanation(null);
          
          setIsLoading(true);
          setOpenLeanMoreDrawer(true);

          const response = await axiosInstance.post(
            API_PATHS.AI.GENERATE_EXPLANATION,
            { question }
          );
          setExplanation(response.data);
        } catch (err) {
          setExplanation(null);
          console.error("ERROR OCCURED", err);
          setErrorMsg("Failed to generate concept explanation. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

// Pin Question
const toggleQuestionPinStatus = async (questionId) => {
   try {
         const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
         console.log("PIN RESPONSE",response);
         if(response.data && response.data.question) {
            // Update the specific question in sessionData
             fetchSessionDetailsById();
             toast.success(response.data.message || "Question pin status updated.");
         } 
        }catch(err){
     console.error("ERROR OCCURED",err);
     toast.error("Failed to update pin status. Please try again.");
   } 
   


};

// Add more questions to a session
const uploadMoreQuestions = async () => {
   try{
      setIsUpdateLoader(true);
      
      console.log("SESSION DATA",sessionData);

      //call AI API to generate  question
      const airespose = await axiosInstance.post(
          API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const genreatedQuestion = airespose.data;
      const response  = await  axiosInstance.post(
        API_PATHS.AI.QUESTION.ADD_TO_SESSION,{
          sessionId,
          questions:genreatedQuestion,
        }
      );
      if(response.data){
        toast.success("Added More");
        fetchSessionDetailsById();
      }

   }catch(err){
    if(err.response.data){
    setErrorMsg(err.response.data.message)
       console.error("ERROR:",err);
    }else{
    setErrorMsg("something went wrong try again")
   }
   }finally{
    setIsUpdateLoader(false);
   }
   

};

useEffect(() => {
  if (sessionId) {
    fetchSessionDetailsById();
  }
}, [sessionId]);

  return (
  <DashboardLayout>
  <RoleInfoHeader
    role={sessionData?.role || ""}
    topicsToFocus={sessionData?.topicsToFocus || ""}
    experience={sessionData?.experience || "-"}
    questions={sessionData?.questions?.length || "-"}
    description={sessionData?.description || ""}
    lastUpdated={
      sessionData?.updatedAt
        ? moment(sessionData.updatedAt).format("Do MMM YYYY")
        : ""
    }
  />
  <div className="container mx-auto md:p-4 px-4">
  <h2 className="text-lg font-semibold text-black">Interview Q & A</h2>

  <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
    
    <div
      className={`col-span-12 ${
        openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
      }`}
    >
      <AnimatePresence>
        {sessionData?.questions?.map((data, index) => {
          console.log("QUESTION DATA",data);
          return (
            <motion.div
              key={data._id || index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 100,
                delay: index * 0.1,
                damping: 15,
              }}
              layout
              layoutId={`question-${data._id || index}`}
              >
              <QuestionsCards
                question={data?.question}
                answer={data?.answer}
                onLearnMore={() =>
                  generateConceptExplanation(data?.question)
                }
                isPinned={data?.isPinned}
                onTogglePin={() =>
                  toggleQuestionPinStatus(data._id)
                }
                
              />
                  {!isLoading && 
                      sessionData?.questions?.length === index + 1 && (
                        <div className="flex items-center justify-center mt-4">
                          <button
                          className='flex items-center gap-2 font-medium bg-black px-2 py-3 mr-2 text-sm text-gray-600 rounded text-nowrap cursor-pointer'
                          disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions} >

                            {isUpdateLoader? (
                              <SpinnerLoader/>
                            ):(
                              <LuListCollapse className="text-2xl text-gray-600" />
                            )}{"  "}
                            Load More
                            </button>
                        </div>
          )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>

  <div className={`${openLeanMoreDrawer ? 'col-span-12 md:col-span-5 block' : 'hidden'}`}>
  <Drawer
    isOpen={openLeanMoreDrawer}
    onClose={() => setOpenLeanMoreDrawer(false)}
    title={!isLoading && explanation?.title}
    isInline={false}
  >
    {errorMsg && (
      <p className="flex gap-2 text-sm text-amber-600 font-medium">
        <LuCircleAlert className="mt-1" /> {errorMsg}
      </p>
    )}

    {isLoading && <SkeletonLoader/>}

    

    {!isLoading && explanation && (
      <AIResponsePReview content={explanation?.explanation} />
    )}
  </Drawer>

</div>
  </div>
</div>

</DashboardLayout>  );
};

export default InterviewPrep;