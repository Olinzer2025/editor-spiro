import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const modelos = [
  { nombre: 'Bayern', imagen: '/modelos_bayern/mockup.jpg', id: 'bayern' },
  { nombre: 'Cosmo', imagen: '/modelos_cosmo/mockup.jpg', id: 'cosmo' },
  { nombre: 'Milan', imagen: '/modelos_milan/mockup.jpg', id: 'milan' },
  { nombre: 'Astado', imagen: '/modelos_astado/mockup.jpg', id: 'astado' },
  { nombre: 'Seneca', imagen: '/modelos_seneca/mockup.jpg', id: 'seneca' },
  { nombre: 'Holanda', imagen: '/modelos_holanda/mockup.jpg', id: 'holanda' },
  { nombre: 'Espectra', imagen: '/modelos_espectra/mockup.jpg', id: 'espectra' },
  { nombre: 'Hydra', imagen: '/modelos_hydra/mockup.jpg', id: 'hydra' },
  { nombre: 'Iberia', imagen: '/modelos_iberia/mockup.jpg', id: 'iberia' },
  { nombre: 'Liberty', imagen: '/modelos_liberty/mockup.jpg', id: 'liberty' },
  { nombre: 'River', imagen: '/modelos_river/mockup.jpg', id: 'river' },
  { nombre: 'Arsenal', imagen: '/modelos_arsenal/mockup.jpg', id: 'arsenal' },
  { nombre: 'Barcelona', imagen: '/modelos_barcelona/mockup.jpg', id: 'barcelona' },
];

const CarruselSelector = () => {
  const navigate = useNavigate();
  const [indiceActual, setIndiceActual] = useState(0);

  const seleccionarModelo = (idModelo) => {
    localStorage.setItem('modeloElegido', idModelo);
    navigate('/bayern');
  };

  const modeloActual = modelos[indiceActual];

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px 16px 40px',
        backgroundColor: '#000',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ color: '#fff', fontSize: '24px', marginBottom: '16px' }}>
       
      </h1>

      {/* 🔼 Botones arriba del carrusel */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <button
          onClick={() => seleccionarModelo(modeloActual.id)}
          style={{
            backgroundColor: '#008F4C',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 16px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            minWidth: '350px',
            whiteSpace: 'pre-line',
            lineHeight: '1.2',
            cursor: 'pointer',
          }}
        >
          MODELO{'\n'}CUELLO REDONDO
        </button>

        <button
          onClick={() => seleccionarModelo(`${modeloActual.id}_cuello_v`)}
          style={{
            backgroundColor: '#D32F2F',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 16px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            minWidth: '350px',
            whiteSpace: 'pre-line',
            lineHeight: '1.2',
            cursor: 'pointer',
          }}
        >
          MODELO{'\n'}CUELLO EN V
        </button>
      </div>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides
        loop
        onSlideChange={(swiper) => setIndiceActual(swiper.realIndex)}
        style={{
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {modelos.map((modelo, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundColor: '#111',
                borderRadius: '12px',
                padding: '10px',
                boxShadow: '0 0 20px rgba(255,255,255,0.1)',
              }}
            >
              <img
                src={modelo.imagen}
                alt={modelo.nombre}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  objectFit: 'contain',
                  maxHeight: '950px',
                }}
              />
              <h2
                style={{
                  color: '#fff',
                  fontSize: '20px',
                  marginTop: '10px',
                }}
              >
                {modelo.nombre.toUpperCase()}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselSelector;