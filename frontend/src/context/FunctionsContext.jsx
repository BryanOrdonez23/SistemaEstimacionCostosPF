import React, { createContext, useContext, useState, useEffect } from "react";

import { createFunctionsRequest, getFunctionsRequest } from "../api/functions";


export const FunctionsContext = createContext();

export const useFunctions = () => {
  const context = useContext(FunctionsContext);
  if (!context) {
    throw new Error(
      "useFunctions debe estar dentro del proveedor FunctionsContext"
    );
  }
  return context;
};

export const FunctionsProvider = ({ children }) => {
  const [funciones, setFunctions] = useState([]);

  const createFunctions = async (id, functions) => {
    try {
      const res = await createFunctionsRequest(id, functions);
      getFunctions(id);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFunctions = async (id) => {
    try {
      const res = await getFunctionsRequest(id);
      setFunctions(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  
  }

  return (
    <FunctionsContext.Provider
      value={{
        funciones,
        createFunctions,
        getFunctions
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
}