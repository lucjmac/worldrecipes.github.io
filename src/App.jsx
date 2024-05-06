import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, Link } from "react-router-dom";

import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import Inicio from "./pages/Inicio";
import Contacto from "./pages/Contacto";
import Recetas from "./pages/Recetas";
import Error404 from "./pages/Error404";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/contacto" element={<Contacto />}></Route>
          <Route path="/recetas" element={<Recetas />}></Route>
          <Route path="/error404" element={<Error404 />}></Route>
          <Route path="/*" element={<Navigate to="/error404" />}></Route>
        </Routes>

      <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
