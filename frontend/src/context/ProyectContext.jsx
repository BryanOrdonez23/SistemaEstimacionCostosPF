import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createProyectRequest,
  getProyectsRequest,
  getProyectRequest,
  updateProyectRequest,
  deleteProyectRequest,
} from "../api/proyect";
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
  const [proyect, setProyect] = useState([]);

  const getProyects = async () => {
    try {
      const res = await getProyectsRequest();
      setProyects(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProyect = async (id) => {
    try {
      const res = await getProyectRequest(id);
      setProyect(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProyect = async (id, proyect) => {
    try {
      const res = await updateProyectRequest(id, proyect);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProyect = async (id) => {
    try {
      const res = await deleteProyectRequest(id);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProyect = async (proyect) => {
    try {
      const res = await createProyectRequest(proyect);
      console.log(res);
      getProyects();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ProyectContext.Provider
      value={{
        proyects,
        createProyect,
        getProyects,
        getProyect,
        updateProyect,
        deleteProyect,
        proyect,
      }}
    >
      {children}
    </ProyectContext.Provider>
  );
};

// Path: frontend/src/context/ProyectContext.jsx
