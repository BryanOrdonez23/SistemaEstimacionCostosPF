import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import RegisterPage from "../src/pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import { ProyectProvider } from "./context/ProyectContext";
import { FunctionsProvider } from "./context/FunctionsContext";
import Homepage from "../src/pages/Homepage";
import NewProyectPage from "./pages/NewProyectPage";
import ProyectFormPage from "./pages/Dashboard";
import Protected from "./Protected";
import { Navbar } from "./components/Navbar";
import Fases from "./pages/functions/Fases";
import Funciones from "./pages/functions/FunctionsPage";
import NewFuncionPage from "./pages/functions/NewFunctionPage";
import UpdateFuncionPage from "./pages/functions/UpdateFunctionPage";

//pf
import PuntosDeFuncionCalculadora from "./pages/pf/CalcuiloPFSA";

function App() {
  return (
    <AuthProvider>
      <ProyectProvider>
        <FunctionsProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<Protected />}>
                <Route path="/newproyect" element={<NewProyectPage />} />
                <Route path="/proyects" element={<ProyectFormPage />} />
                <Route path="/proyect/:id" element={<NewProyectPage />} />
        
                <Route path="/fases/:id" element={<Fases />} />
                <Route path="/funciones/:id" element={<Funciones />} />
                <Route path="/newfunciones/:id" element={<NewFuncionPage />} />
                <Route path="/updatefuncion/:id1/:id2" element={<UpdateFuncionPage />} />

                
                <Route path="/calculopfsa/:id" element={<PuntosDeFuncionCalculadora />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FunctionsProvider>
      </ProyectProvider>
    </AuthProvider>
  );
}
export default App;
