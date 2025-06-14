import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioCotizacion = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [error, setError] = useState('');

  const handleEnviar = () => {
    if (!nombre || !correo || !telefono) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    setError('');
    // Aquí puedes enviar los datos al backend o por correo
    alert('Cotización enviada correctamente.');
    navigate('/'); // Puedes cambiar esto si prefieres otra ruta de redirección después de enviar
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', textAlign: 'center' }}>
      <h2>Formulario de Cotización</h2>

      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ width: '100%', margin: '10px 0', padding: '10px' }}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        style={{ width: '100%', margin: '10px 0', padding: '10px' }}
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        style={{ width: '100%', margin: '10px 0', padding: '10px' }}
      />
      <textarea
        placeholder="Comentarios o detalles del pedido"
        value={comentarios}
        onChange={(e) => setComentarios(e.target.value)}
        style={{ width: '100%', margin: '10px 0', padding: '10px', height: '100px' }}
      />

      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button onClick={() => navigate('/vista-previa')} style={{ padding: '10px 20px' }}>
          Regresar
        </button>
        <button onClick={handleEnviar} style={{ backgroundColor: '#e63900', color: '#fff', padding: '10px 20px', border: 'none' }}>
          Enviar cotización
        </button>
      </div>
    </div>
  );
};

export default FormularioCotizacion;