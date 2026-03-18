"use client";

import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center transition-opacity duration-300"
      onClick={onClose} // Close modal on backdrop click
    >
      {/* Modal Panel */}
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative transform transition-all duration-300 scale-95"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside it
        style={isOpen ? { transform: 'scale(1)' } : {}}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 p-1 rounded-full"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;