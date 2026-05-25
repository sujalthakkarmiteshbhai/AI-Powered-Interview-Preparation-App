import React from "react";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] fixed top-0 left-0 w-full z-50 ">
      <div className="flex items-center justify-between px-6 h-full">
        <Link to="/dashboard">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            Interview Prep AI
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;