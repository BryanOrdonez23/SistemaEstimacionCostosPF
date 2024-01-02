import React, { createContext, useContext, useState, useEffect } from "react";
import { actualizarDatosPFRequest, sumaValorFactoresAjusteRequest, getPuntosFuncionRequest,calcuarPFSARequest, getFactoresAjusteRequest, getValorFactoresAjusteRequest, createValorFactoresAjusteRequest } from "../api/pf";
// involucrados
import { createInvolucradosRequest, getInvolucradosRequest, deleteInvolucradoRequest, getInvolucradoRequest, updateInvolucradoRequest, sumatoriaCostosInvolucradosRequest, promedioSueldosInvolucradosRequest, contarInvolucradosRequest } from "../api/involucrados";

import {createOtrosGastosRequest, getOtrosGastosRequest, getOtroGastoRequest,updateOtroGastoRequest,deleteOtroGastoRequest, sumatoriaCostosOtrosGastosRequest} from "../api/otrosGastos";

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
  const [involucrados, setInvolucrados] = useState([]);
  const [otrosGastos, setOtrosGastos] = useState([]);


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

  const actualizarDatosPF = async (id, data) => {
    try {
      const response = await actualizarDatosPFRequest(id, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
//----------------------------------involucrados---------------------------------------------
const getInvolucrados = async (id) => {
  try {
    const response = await getInvolucradosRequest(id);
    setInvolucrados(response.data);
    return response.data;
  } catch (error) {
    setInvolucrados([]);
    console.log(error);
  }
}

const createInvolucrados = async (id, data) => {
  try {
    const response = await createInvolucradosRequest(id, data);
    setInvolucrados(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const deleteInvolucrado = async (id1, id2) => {
  try {
    const response = await deleteInvolucradoRequest(id1, id2);
    getInvolucrados(id1);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

const getInvolucrado = async (id2) => {
  try {
    const response = await getInvolucradoRequest(id2);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const updateInvolucrado = async (id1, id2, data) => {
  try {
    const response = await updateInvolucradoRequest(id1, id2, data);
    getInvolucrados(id1);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

// -------------- Otros gastos

const getOtrosGastos = async (id) => {
  try {
    const response = await getOtrosGastosRequest(id);
    setOtrosGastos(response.data);
    return response.data;
  } catch (error) {
    setOtrosGastos([]);
    console.log(error);
  }
}
const getOtroGasto = async (id2) => {
  try {
    const response = await getOtroGastoRequest(id2);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
const createOtrosGastos = async (id, data) => {
  try {
    const response = await createOtrosGastosRequest(id, data);
    setOtrosGastos(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
const updateOtroGasto = async (id1, id2, data) => {
  try {
    const response = await updateOtroGastoRequest(id1, id2, data);
    getOtrosGastos(id1);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
const eliminarOtroGasto = async (id1, id2) => {
  try {
    const response = await deleteOtroGastoRequest(id1, id2);
    getOtrosGastos(id1);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}


/// sumatrorias 

const sumatoriaCostosInvolucrados = async (id) => {
  try {
    const response = await sumatoriaCostosInvolucradosRequest(id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const promedioSueldosInvolucrados = async (id) => {
  try {
    const response = await promedioSueldosInvolucradosRequest(id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const contarInvolucrados = async (id) => {
  try {
    const response = await contarInvolucradosRequest(id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const sumaotroGastos = async (id) => {
  try {
    const response = await sumatoriaCostosOtrosGastosRequest(id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const calculoPresupuesto = async (nd, cm,  ps, og) => {
  const calculo = (nd * cm * ps) + og;

  return calculo;
}


const generarCodigoProyecto = () => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-*/+#';

  const fechaActual = new Date();
  const diaActual = fechaActual.getDate();
  const segundosActuales = fechaActual.getSeconds();

  let codigo = '';
  codigo += String(diaActual).padStart(2, '0'); // Agrega el día actual (asegurando dos dígitos)
  codigo += String(segundosActuales).padStart(2, '0'); // Agrega los segundos actuales (asegurando dos dígitos)

  // Agrega 6 caracteres alfanuméricos adicionales
  for (let i = 0; i < 7; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres.charAt(indice);
  }

  return codigo;
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
        sumaValorFactoresAjuste,
        actualizarDatosPF,
        setdatosPuntosFuncion,
        getInvolucrados,
        createInvolucrados,
        involucrados,
        deleteInvolucrado,
        getInvolucrado,
        updateInvolucrado,
        getOtrosGastos,
        getOtroGasto,
        createOtrosGastos,
        updateOtroGasto,
        eliminarOtroGasto,
        otrosGastos,
        sumatoriaCostosInvolucrados,
        promedioSueldosInvolucrados,
        contarInvolucrados,
        sumaotroGastos,
        calculoPresupuesto
      }}
    >
      {children}
    </EstimacionPFContext.Provider>
  );
};
