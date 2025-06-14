import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditorInicio = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: 'url(/fondo_inicio.jpg)', // Usa el fondo que ya tienes
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '50px',
        position: 'relative',
      }}
    >
<button
  onClick={() => navigate('/elegir-modelo')}
  style={{
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '40px',
    fontWeight: 'bold',
    padding: '24px 0',
    width: '90%',
    maxWidth: '500px', // Esto lo deja ancho como la playera
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
  }}
  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
  onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
>
  INICIAR
</button>
    </div>
  );
};

export default EditorInicio;