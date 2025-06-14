import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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
  const [anchoCarrusel, setAnchoCarrusel] = useState('500px');
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const ajustarAncho = () => {
      if (window.innerWidth >= 1200) {
        setAnchoCarrusel('900px');
      } else if (window.innerWidth >= 768) {
        setAnchoCarrusel('700px');
      } else {
        setAnchoCarrusel('100%');
      }
    };

    ajustarAncho();
    window.addEventListener('resize', ajustarAncho);
    return () => window.removeEventListener('resize', ajustarAncho);
  }, []);

  const seleccionarModelo = (idModelo) => {
    localStorage.setItem('modeloElegido', idModelo);
    navigate('/bayern');
  };

  const modeloActual = modelos[indiceActual];

  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#000', minHeight: '100vh' }}>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides
        loop
        onSlideChange={(swiper) => setIndiceActual(swiper.realIndex)}
        style={{ maxWidth: anchoCarrusel, margin: 'auto' }}
      >
        {modelos.map((modelo, index) => (
          <SwiperSlide key={index}>
            <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '20px', boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
              <img
                src={modelo.imagen}
                alt={modelo.nombre}
                style={{ width: '100%', borderRadius: '12px' }}
              />
              <h2 style={{ color: '#fff', margin: '10px 0', fontSize: '24px' }}>{modelo.nombre.toUpperCase()}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '30px' }}>
        <button
          onClick={() => seleccionarModelo(modeloActual.id)}
          style={{
            padding: '12px 18px',
            backgroundColor: '#008F4C',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            minWidth: '180px',
            whiteSpace: 'pre-line',
            lineHeight: '1.2',
          }}
        >
          MODELO{'\n'}CUELLO REDONDO
        </button>

        <button
          onClick={() => seleccionarModelo(`${modeloActual.id}_cuello_v`)}
          style={{
            padding: '12px 18px',
            backgroundColor: '#D32F2F',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            minWidth: '180px',
            whiteSpace: 'pre-line',
            lineHeight: '1.2',
          }}
        >
          MODELO{'\n'}CUELLO EN V
        </button>
      </div>
    </div>
  );
};

export default CarruselSelector;