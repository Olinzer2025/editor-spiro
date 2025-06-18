import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EditorInicio.css'; // Importa los estilos externos

const EditorInicio = () => {
  const navigate = useNavigate();

  return (
    <div className="editor-inicio-container">
      <button
        className="iniciar-boton"
        onClick={() => navigate('/elegir-modelo')}
      >
        INICIAR
      </button>
    </div>
  );
};

export default EditorInicio;