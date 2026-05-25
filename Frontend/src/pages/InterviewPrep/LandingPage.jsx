import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import home from "../../assets/home.png";
import { APP_FEATURES } from "../../utils/data";
import Modal from "../../components/Modal";
import { Login } from "../auth/Login";
import { Signup as SignUp } from "../auth/Signup";
import { UserContext } from "../../context/userContext";
import  ProfileInfoCard  from "../../components/cards/ProfileInfoCard";

export const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigation("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full h-screen min-h-full bg-white ">
        <div className="w-full  h-[700px] bg-amber-200/20 blur-[65px] absolute top-0 left-0"></div>

        <div className="container mx-auto px-4 pt-6 pb-16 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            <div className="text-xl text-black font-bold">Interview Prep</div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-transparent cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Signup
              </button>
            )}
          </header>

          {/* Hero Section */}

          <div className="flex flex-col md:flex-row items-center ">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="mb-2">
                <div className="inline-flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300 mb-4">
                  <LuSparkles /> AI Powered
                </div>

                <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                  Ace Interviews with <br />
                  <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                    AI-Powered
                  </span>{" "}
                  Learning
                </h1>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-600 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts with AI-powered detailed explanations
                and more.
              </p>

              <button
                className="rounded-full border border-yellow-50 bg-black text-white text-sm font-semibold px-7 py-2.5 hover:bg-yellow-100 hover:text-black hover:border-yellow-300 transition-colors cursor-pointer "
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10 mb-1">
        <div>
          <section className="flex items-center justify-center -mt-90">
            <img src={home} alt="Hero Image" className="w-[80vw] rounded-lg" />
          </section>
        </div>
      </div>
      <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <section className="mt-5">
            <h2 className="text-2xl font-medium text-center mb-12">
              Features That Make You Shine
            </h2>

            <div className="flex flex-col items-center gap-8">
              {/* First 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFFFF8] p-6 rounded-xl shadow-xs hover:shadow-lg  show-amber-100 transition border border-amber-100"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
              {/* Next 2 cards */}
              {/* Remaining 2 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFFFF8] p-6 rounded-xl shadow-xs hover:shadow-lg show-amber-100 transition border border-amber-100"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
        Made with ❤️... Happy Coding
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        title={currentPage === "login" ? "Login" : "Sign Up"}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {currentPage === "login" && (
            <Login
              setCurrentPage={setCurrentPage}
              onClose={() => setOpenAuthModal(false)}
            />
          )}

          {currentPage === "signup" && (
            <SignUp
              setCurrentPage={setCurrentPage}
              onClose={() => setOpenAuthModal(false)}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
