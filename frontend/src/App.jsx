import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import RegisterPage from "../src/pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import { ProyectProvider } from "./context/ProyectContext";
import Homepage from "../src/pages/Homepage";
import NewProyectPage from "./pages/NewProyectPage";
import ProyectFormPage from "./pages/Dashboard";
import Protected from "./Protected";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <ProyectProvider>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </ProyectProvider>
    </AuthProvider>
  );
}
export default App;
