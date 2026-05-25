import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

export const SummaryCard = (
  {
  
  colour,
  role,
  topicToFocus,
  experience,
  questions,
  description,
  lastupdated,
  onSelect,
  onDelete,
}) => {
   return (
 <div className="bg-white border border-gray-300 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-lg shadow-gray-300 relative"
  onClick={onSelect} >
   <div className=" rounded-lg p-4 cursor-pointer relative"
   style={{
   background: colour.bgcolor,
   }}
   >  
   <div className="flex item-start">
     <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md item-centre justify-center mr-4 ">
        <span className="text-lg font-semibold text-black">
            {getInitials(role)}
        </span>
     </div>
       
      
       {/* Content Container */}
<div className="flex-grow">
  <div className="flex justify-between items-start">
    {/* Title and Skills */}
    <div>
      <h2 className="text-[17px] font-medium">{role}</h2>
      <p className="text-xs text-medium □ text-gray-900">
        {topicToFocus}
      </p>
    </div>
  </div>
</div>
   </div>
 
<button
  className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-100 py-1 rounded text-nowrap border-rose-200 cursor-pointer absolute top-0 right-0"
  onClick={(e) => {
    e.stopPropagation();
    onDelete();
  }}
>
  <LuTrash2 size={14} />
</button>
 </div>

   <div className="px-3 pb-3">
    <div className="flex item-centre gap-3 mt-4">
        <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-300 rounded-full">
            Experience : {experience} {experience === 1 ? "year" : "years"}
        </div>
          
          <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-300 rounded-full">
            Questions : {questions}
          </div>
           <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-300 rounded-full">
            Last Updated : {lastupdated}
          </div>
    </div>

    {/* Description */}
    <p className="text-[14px] text-gray-600 mt-2">
      {description}
    </p>
   </div>
 </div>
  
);
};
