import React from "react";

export const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  lastUpdated,
}) => {
  return (
 <div className="bg-white pt-10 px-10  relative  ">
      <div className="container mx-auto px-10 md:px-0">
        <div className="h-[146px] flex flex-col justify-center relative z-10">
          
          <div className="flex items-start">
            <div className="flex-grow">
              {/* <div className="flex justify-between items-start"> */}
                <div>
                  <h2 className="text-4xl font-semibold">{role}</h2>
                  <p className="text-sm text-gray-900 mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              {/* </div> */}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="text-[10px] font-semibold text-white bg-black px-2 py-1 rounded">
              Experience: {experience} {experience == 1 ? "Year" : "Years"}
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-2 py-1 rounded">
              {questions} Q&A 
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-2 py-1 rounded">
              Last Updated: {lastUpdated}
            </div>
          </div>

            <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center">
              <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob1" />
              <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob2" />
              <div className="w-16 h-16 bg-cyan-300 blur-[45px] animate-blob3" />
              <div className="w-16 h-16 bg-fuchsia-200 blur-[45px] animate-blob4" />
            </div>

        </div>
      </div>
    </div>
  );
};
