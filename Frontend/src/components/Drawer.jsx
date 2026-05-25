import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children, isInline = false }) => {
  const baseClasses = isInline
    ? `w-full ${isOpen ? "block" : "hidden"} sticky top-[64px] h-[64px] overflow-y-auto p-4`
    : `fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] p-4 overflow-y-auto transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-full md:w-5/12`;

  return (
    <div className={baseClasses} tabIndex="-1" aria-labelledby="drawer-right-label">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 id="drawer-right-label" className="flex items-center text-base font-semibold text-black">
          {title}
        </h5>

        {/* Close Button */}
        <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5">
          <LuX className="text-lg" />
        </button>
      </div>

      {/* Body Content */}
      <div>{children}</div>
    </div>
  );
};

export default Drawer;