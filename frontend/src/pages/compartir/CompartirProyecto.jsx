import React, { useState } from "react";
import { useProyect } from "../../context/ProyectContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Popup from "../../components/Popup";
import PopupError from "../../components/PopuoError";
import Breadcrumbs from "../../components/Breadcrumbs ";

function CompartirProyecto() {
  const {createProyectShared} = useProyect();
  const { register, handleSubmit, setValue} = useForm();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Compartir Proyecto - App costos";
  }, []);
  
  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSuccessMessage("");
  };
const handleErrorClose = () => {
    setShowError(false);
    setErrorMessage("");
}

  const onSubmit = handleSubmit(async (data) => {
    try {
        const res = await createProyectShared(data);
        if (res.status === 200) {
            setSuccessMessage("Ingreso exitoso");
            setShowSuccess(true);
            setValue("keyShared", "");
            navigate("/proyects");
        }else{
          setValue("keyShared", "");
            setErrorMessage("No se pudo ingresar al proyecto");
            setShowError(true);
        }

    } catch (error) {
      setValue("keyShared", "");
        setErrorMessage("No se pudo ingresar al proyecto, ingrese un código de invitación válido");
        setShowError(true);
        console.error(error);
    }

    //navigate("/proyects");
  });

  const routes = [
    { path: '/proyects', displayName: 'Inicio' },
    { path: '/compartir', displayName: 'Compartir Proyecto' },
  ];


  return (
    <div className="flex items-center justify-start my-12 h-screen flex-col bg-CCE3FF">
      <Breadcrumbs routes={routes} />
      <div className="max-w-xl mb-4 text-center bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Ingresar a un Proyecto:
        </h1>
        <p className="text-gray-800">
          {" "}
          Para poder ingresar al proyecto debes conocer el codigo de invitación
        </p>
        <br />
        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="keyShared"
            name="keyShared"
            placeholder="Ingresa el código de invitación"
            required
            className="border border-gray-300 text-gray-800 p-4 mb-4 rounded-md w-full text-center text-3xl"
            {...register("keyShared", { required: true })}
          />{" "}
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
          >
            Ingresar al Proyecto
          </button>
        </form>
        <Popup isOpen={showSuccess} message={successMessage} onClose={handleSuccessClose} />
        <PopupError isOpen={showError} message={errorMessage} onClose={handleErrorClose} />
      </div>
    </div>
  );
}

export default CompartirProyecto;
