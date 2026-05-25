
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  Input  from "../../components/inputs/input";
import { SpinnerLoader } from "../../components/loader/SpinnerLoader";
import  axiosInstance  from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    topicToFocus: "",
    experience: "",
  
    description: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlesubmit = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlecreateSession = async (e) => {
    e.preventDefault();
    const { role, topicToFocus, experience , description } = formData;
    if (!role || !topicToFocus || !experience  || !description) {
      setError("Please fill in all the fields.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          ...formData,
          numberOfQuestions: 10,
        }
      );
      const generatedQuestions = aiResponse.data?.questions || [];

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (err) {
      if(err.response?.data?.message) {
        setError(err.response.data.message);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" w-full p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold mb-4 text-black">
        Start a New Interview Journey{" "}
      </h3>
      <p className="text-sm text-slate-600 mb-3 mt-[5px]">
        Fill out few details about your interview preferences and let us help
        you ace your next interview!
      </p>

      <form className=" flex flex-col gap-4 " onSubmit={handlecreateSession}>
        <Input
          label="Role"
          placeholder="e.g. Software Engineer"
          value={formData.role}
          onChange={(e) => handlesubmit("role", e.target.value)}
          type="text"
        />
        <Input
          label="Year of Experience"
          placeholder="e.g. 2 years"
          value={formData.experience}
          onChange={(e) => handlesubmit("experience", e.target.value)}
          type="number"
        />
        <Input
          label="Topic to Focus"
          placeholder="e.g. JavaScript,React,NodeJS"
          value={formData.topicToFocus}
          onChange={(e) => handlesubmit("topicToFocus", e.target.value)}
          type="text"
        />
        <Input
          label="Description"
          placeholder="Tell us more about your interview preferences and any specific areas you want to focus on."
          value={formData.description}
          onChange={(e) => handlesubmit("description", e.target.value)}
          type="text"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="btn-primary mt-2 w-full"
          disabled={isloading}
        >
          {isloading && <SpinnerLoader />}
          Create Session
        </button>
      </form>
    </div>
  );
};
