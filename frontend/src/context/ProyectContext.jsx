import React, { createContext, useContext, useState, useEffect } from "react";
import { createProyectRequest, getProyectsRequest } from "../api/proyect";
export const ProyectContext = createContext();

export const useProyect = () => {
  const context = useContext(ProyectContext);
  if (!context) {
    throw new Error(
      "useProyect debe estar dentro del proveedor ProyectContext"
    );
  }
  return context;
};

export const ProyectProvider = ({ children }) => {
  const [proyects, setProyects] = useState([]);

  const getProyects = async () => {
    try {
      const res = await getProyectsRequest();
      setProyects(res.data);
      console.log(res.data);
    } catch (error) {
        console.error(error);
    }
  };

  const createProyect = async (proyect) => {
    const res = await createProyectRequest(proyect);
    console.log(res);
  };
  return (
    <ProyectContext.Provider
      value={{
        proyects,
        createProyect,
        getProyects,
      }}
    >
      {children}
    </ProyectContext.Provider>
  );
};

// Path: frontend/src/context/ProyectContext.jsx
