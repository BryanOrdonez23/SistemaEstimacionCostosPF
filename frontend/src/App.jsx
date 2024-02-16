import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import RegisterPage from "../src/pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import { ProyectProvider } from "./context/ProyectContext";
import { FunctionsProvider } from "./context/FunctionsContext";
import { EstimacionPFProvider } from "./context/EstimacionPFContext";
import { AdminProvider } from "./context/AdminContext";
import Homepage from "../src/pages/Homepage";
import NewProyectPage from "./pages/NewProyectPage";
import ProyectFormPage from "./pages/Dashboard";
import Protected from "./Protected";
import Navbar from "./components/Navbar";
import Fases from "./pages/Fases";
import Funciones from "./pages/functions/FunctionsPage";
import NewFuncionPage from "./pages/functions/NewFunctionPage";
import UpdateFuncionPage from "./pages/functions/UpdateFunctionPage";

import Perfil from "./pages/profile/ProfilePage";
import CambioContra from "./pages/profile/CambioContra";
import UpdateDatosUser from "./pages/profile/UpdateDatosUser";

//pf
import PuntosDeFuncionCalculadora from "./pages/pf/CalcuiloPFSA";
import FactoresAjuste from "./pages/pf/FactoresAjuste";
import CalculoPFCA from "./pages/pf/CalculoPFCA";
import EsfuerzoPF from "./pages/pf/EsfuerzoPF";
import EsfuerzoExplicacion from "./pages/pf/EsfuerzoExplicacion";

// involucrados
import NewInvolucrados from "./pages/involucrados/NewInvolucrados";
import InicioInvolucrados from "./pages/involucrados/InicioInvolucrados";

//Otros gastos

import NewOtrosGastos from "./pages/otrosGastos/NewOtrosGastos";
import InicioOtrosGastos from "./pages/otrosGastos/InicioOtrosGastos";

// presupuesto

import Presupuesto from "./pages/presupuesto/Presupuesto";


// compartir
import Compartir from "./pages/compartir/CompartirProyecto";

// inforeme

import InformeFinal from "./pages/informe/InformeFinal";


// admin

import LoginPageAdmin from "./pages/admin/LoginPageAdmin";
import MenuAdmin from "./pages/admin/MainPageAdmin";
import ProtectedAdmin from "./ProtectedAdmin";
import UserMainPage from "./pages/admin/users/UserMainPage"
import UserUpdate from "./pages/admin/users/UserUpdate"
import ProyectMainAdmin from "./pages/admin/proyects/ProyectMainAdmin";
import UpdateProyectAdmin from "./pages/admin/proyects/UpdateProyectAdmin";
import ConfigTipoAdmin from "./pages/admin/configs/ConfigTipoAdmin";
import NewTipoAdmin from "./pages/admin/configs/NewTipoAdmin";
import UpdateTipoAdmin from "./pages/admin/configs/UpdateTipoAdmin";
import UserUpdatePass from "./pages/admin/users/UserUpdatePass";
import UserAdminsMainPage from "./pages/admin/usersAdmin/UserAdminsMainPage";
import CreateAdminPage from "./pages/admin/usersAdmin/CreateAdminPage";
import UpdateAdminPage from "./pages/admin/usersAdmin/UpdateAdminPage";
import CambioPassAdmin from "./pages/admin/usersAdmin/CambioPassAdmin";



function App() {
  return (
    <AdminProvider>
    <AuthProvider>
      <ProyectProvider>
        <FunctionsProvider>
        <EstimacionPFProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/administrador/login" element={<LoginPageAdmin />} />
              
              <Route element={<ProtectedAdmin />}>
              <Route path="/administrador/menu" element={<MenuAdmin />} />
              <Route path="/administrador/users" element={<UserMainPage />} />
              <Route path="/administrador/users/:id" element={<UserUpdate />} />
              <Route path="/administrador/proyects" element={<ProyectMainAdmin />} />
              <Route path="/administrador/proyects/:id" element={<UpdateProyectAdmin />} />
              <Route path="/administrador/tipofunciones" element={<ConfigTipoAdmin />} />
              <Route path="/administrador/tipofunciones/newtipofunciones" element={<NewTipoAdmin />} />
              <Route path="/administrador/tipofunciones/:id" element={<UpdateTipoAdmin />} />
              <Route path="/administrador/users/cambio/:id" element={<UserUpdatePass />} />
              <Route path="/administrador/admins" element={<UserAdminsMainPage />} />
              <Route path="/administrador/admins/create" element={<CreateAdminPage />} />
              <Route path="/administrador/admins/:id" element={<UpdateAdminPage />} />
              <Route path="/administrador/admins/cambio/:id" element={<CambioPassAdmin />} />
              </Route> 
               
              <Route element={<Protected />}>
              
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/editar-password" element={<CambioContra />} />
                <Route path="/editar-datos" element={<UpdateDatosUser />} />


                <Route path="/newproyect" element={<NewProyectPage />} />
                <Route path="/proyects" element={<ProyectFormPage />} />
                <Route path="/proyect/:id" element={<NewProyectPage />} />
        
                <Route path="/fases/:id" element={<Fases />} />
                <Route path="/funciones/:id" element={<Funciones />} />
                <Route path="/newfunciones/:id" element={<NewFuncionPage />} />
                <Route path="/updatefuncion/:id1/:id2" element={<UpdateFuncionPage />} />

                
                <Route path="/calculopfsa/:id" element={<PuntosDeFuncionCalculadora />} />
                <Route path="/fasePFAjustado/:id" element={<FactoresAjuste />} />                
                <Route path="/calculopfca/:id" element={<CalculoPFCA />} />
                <Route path="/esfuerzopf/:id" element={<EsfuerzoPF />} />
                <Route path="/esfuerzoExplicacion/:id" element={<EsfuerzoExplicacion />} />


                <Route path="/newinvolucrados/:id" element={<NewInvolucrados />} />
                <Route path="/updateinvolucrado/:id/:id2" element={<NewInvolucrados />} />
                <Route path="/involucrados/:id" element={<InicioInvolucrados />} />


                <Route path="/newotrosGastos/:id" element={<NewOtrosGastos />} />
                <Route path="/updateotrosGastos/:id/:id2" element={<NewOtrosGastos />} />
                <Route path="/otrosGastos/:id" element={<InicioOtrosGastos />} />

                <Route path="/presupuesto/:id" element={<Presupuesto />} />
                <Route path="/compartir" element={<Compartir />} />
                <Route path="/informe/:id" element={<InformeFinal />} />
              </Route>
            
            </Routes>
          </BrowserRouter>
          </EstimacionPFProvider>
        </FunctionsProvider>
      </ProyectProvider>
    </AuthProvider>
    </AdminProvider>
  );
}
export default App;
