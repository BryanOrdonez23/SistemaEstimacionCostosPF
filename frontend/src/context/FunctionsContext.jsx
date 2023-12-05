import React, { createContext, useContext, useState, useEffect } from "react";

import { createFunctionsRequest, getFunctionsRequest, deleteFunctionRequest, getFunctionRequest, updateFunctionRequest } from "../api/functions";


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
      setFunctions([]);
      console.error(error);
    }
  }

  const getFunction = async (id) => {
    try {
      const res = await getFunctionRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
  const deleteFunctions = async (id1, id2) => {
    try {
      const res = await deleteFunctionRequest(id1, id2);
      getFunctions(id1);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  const updateFunction = async (id1, id2, functions) => {
    try {
      const res = await updateFunctionRequest(id1, id2, functions);
      getFunctions(id1);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  
  }



  return (
    <FunctionsContext.Provider
      value={{
        funciones,
        createFunctions,
        getFunctions,
        deleteFunctions,
        getFunction,
        updateFunction
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
}