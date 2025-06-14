// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorInicio from './pages/EditorInicio';
import ElegirModelo from './pages/ElegirModelo.jsx';
import Bayern from './pages/Bayern';
import VistaPrevia from './pages/VistaPrevia';
import FormularioCotizacion from './pages/FormularioCotizacion'; // ✅ Nueva importación

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorInicio />} />
        <Route path="/elegir-modelo" element={<ElegirModelo />} />
        <Route path="/bayern" element={<Bayern />} />
        <Route path="/vista-previa" element={<VistaPrevia />} />
        <Route path="/formulario-cotizacion" element={<FormularioCotizacion />} /> {/* ✅ Nueva ruta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;