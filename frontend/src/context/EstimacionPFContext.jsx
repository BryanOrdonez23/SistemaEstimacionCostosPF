import React, { createContext, useContext, useState, useEffect } from "react";
import { calcuarPFSARequest, getFactoresAjusteRequest } from "../api/pf";

export const EstimacionPFContext = createContext();

export const useEstimacionPF = () => {
  const context = useContext(EstimacionPFContext);
  if (!context) {
    throw new Error(
      "useEstimacionPF debe estar dentro del proveedor EstimacionPFContext"
    );
  }
  return context;
};

export const EstimacionPFProvider = ({ children }) => {
  const [puntosFuncionTotal, setPuntosFuncionTotal] = useState(0);
  const [factoresAjuste, setFactoredAjuste] = useState([]);

  const pfsaCalculo = async (id) => {
    try {
      const response = await calcuarPFSARequest(id);
      setPuntosFuncionTotal(response.data.puntosFuncionTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const getFactoresAjuste = async () => {
    try {
      const response = await getFactoresAjusteRequest();
      setFactoredAjuste(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <EstimacionPFContext.Provider
      value={{
        puntosFuncionTotal,
        pfsaCalculo,
        setPuntosFuncionTotal,
        factoresAjuste,
        getFactoresAjuste
      }}
    >
      {children}
    </EstimacionPFContext.Provider>
  );
};
