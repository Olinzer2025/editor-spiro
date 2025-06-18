// FormularioCotizacion.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser'; // ✅ Paquete actualizado

const FormularioCotizacion = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleEnviar = async () => {
    if (!nombre || !correo || !telefono) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    setError('');
    setEnviando(true);

    try {
      const imagen = localStorage.getItem('imagenBase64');

      if (!imagen) {
        throw new Error('No se encontró la imagen en localStorage.');
      }

      const templateParams = {
        nombre,
        correo,
        telefono,
        comentarios,
        imagen_base64: imagen, // debe estar configurado en tu plantilla de EmailJS
      };

      await emailjs.send(
        'service_l6gzi8m',            // ✅ ID del servicio
        'template_z3hi9t9',           // ✅ ID de la plantilla
        templateParams,
        'mX3ZQC7StVJK7WZu9'           // ✅ Tu clave pública
      );

      alert('Cotización enviada correctamente.');
      navigate('/');
    } catch (err) {
      console.error('Error completo al enviar:', err);
      alert('Hubo un error al enviar la cotización.');
    } finally {
      setEnviando(false);
    }
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
        <button
          onClick={handleEnviar}
          disabled={enviando}
          style={{
            backgroundColor: enviando ? '#aaa' : '#e63900',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            cursor: enviando ? 'not-allowed' : 'pointer'
          }}
        >
          {enviando ? 'Enviando...' : 'Enviar cotización'}
        </button>
      </div>
    </div>
  );
};

export default FormularioCotizacion;