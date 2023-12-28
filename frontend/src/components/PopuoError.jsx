import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const PopupError = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    let timeoutId;

    if (isOpen) {
      timeoutId = setTimeout(() => {
        onClose();
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-slate-100 p-12 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600 text-4xl mr-4" />
              <p className="text-xl text-gray-800">{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupError;
