import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { useAdmin } from "../../../context/AdminContext";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs ";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateAdminPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
      } = useForm();
    
      const { updateAdmin , errors: registerErrors, getAdmins, getAdmin} = useAdmin();
    
      const navigate = useNavigate();
      const params = useParams();
    
      useEffect(() => {
        document.title = "App costos - Actualizar Admin";
        async function loadfunction() {
            if (params.id) {
              const userfound = await getAdmin(params.id);
              setValue("name", userfound.name);
              setValue("lastname", userfound.lastname);
              setValue("email", userfound.email);
            }
          }
          loadfunction();
      }, []);
    
      const onSubmit = handleSubmit(async (values) => {
        const res = await updateAdmin(params.id, values);
        if (res) {
            getAdmins();
            navigate("/administrador/admins");
        }
      });
    
      const routes = [
        { path: '/administrador/menu', displayName: 'Inicio' },
        { path: `/administrador/admins`, displayName: 'Administrar Administradores' },
        { path: `/administrador/admins/${params.id}`, displayName: 'Actualizar Administrador' },
      ];
    
    
      return (
        <div className="max-w-2xl mx-auto mt-4 p-6 bg-white rounded-md shadow-md text-black">
            <Breadcrumbs routes={routes} />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Formulario de Actualización de Admins
          </h1>
          {registerErrors.map((error, i) => (
        <div
          className="bg-red-500 text-sm p-2 text-white text-center my-2"
          key={i}
        >
          {error}
        </div>
      ))}
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="text-gray-800 block">Nombre:</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 bg-gray-200 text-gray-800 border rounded"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  El campo nombre es requerido
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="text-gray-800 block">Apellido:</label>
              <input
                type="text"
                name="apellido"
                className="w-full p-2 bg-gray-200 text-gray-800 border rounded"
                {...register("lastname", { required: true })}
              />
              {errors.lastname && (
                <span className="text-red-500 text-sm">Apellido requerido</span>
              )}
            </div>
            <div className="mb-4">
              <label className="text-gray-800 block">Correo Electrónico:</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 bg-gray-200 text-gray-800 border rounded"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  El campo correo Electrónico es requerido
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            >
              Actualizar Admin
            </button>
          </form>
    
        </div>
      );
    }

export default UpdateAdminPage