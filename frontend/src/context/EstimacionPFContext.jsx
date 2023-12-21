import React, { createContext, useContext, useState, useEffect } from "react";
import { sumaValorFactoresAjusteRequest, getPuntosFuncionRequest,calcuarPFSARequest, getFactoresAjusteRequest, getValorFactoresAjusteRequest, createValorFactoresAjusteRequest } from "../api/pf";

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
  const [valorfactoresAjuste, setvalorfactoresAjuste ] = useState([]);
  const [datosPuntosFuncion, setdatosPuntosFuncion] = useState([]);


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

  const getValorFactoresAjuste = async (id) => {
    try {
      const response = await getValorFactoresAjusteRequest(id);
      setvalorfactoresAjuste(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  const createValorFactoresAjuste = async (id, valor) => {
    try {
      console.log(valor);
      const response = await createValorFactoresAjusteRequest(id, valor);
      setvalorfactoresAjuste(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const getPuntosFuncion = async (id) => {
    try {
      const response = await getPuntosFuncionRequest(id);
      setdatosPuntosFuncion(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const sumaValorFactoresAjuste = async (id) => {
    try {
      const response = await sumaValorFactoresAjusteRequest(id);
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
        getFactoresAjuste,
        getValorFactoresAjuste,
        createValorFactoresAjuste,
        valorfactoresAjuste,
        datosPuntosFuncion,
        getPuntosFuncion,
        sumaValorFactoresAjuste
      }}
    >
      {children}
    </EstimacionPFContext.Provider>
  );
};
