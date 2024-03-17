// Note.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Nota = ({ children }) => (
  <div className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-950 px-2 py-2 sm:px-4 sm:py-3 shadow-md" role="alert">
    <div className="flex items-center">
      <div className="py-1">
        <FontAwesomeIcon icon={faInfoCircle} className="fill-current h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-4" />
      </div>
      <div>
        <p className="text-sm font-semibold">{children}</p>
      </div>
    </div>
  </div>
);

export default Nota;