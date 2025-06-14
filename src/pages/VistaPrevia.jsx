import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VistaPrevia = () => {
  const [datos, setDatos] = useState(null);
  const navigate = useNavigate();
  const [shortSeleccionado, setShortSeleccionado] = useState('');

  useEffect(() => {
    const almacenados = localStorage.getItem('vistaPrevia');
    if (almacenados) {
      setDatos(JSON.parse(almacenados));
    }

    const shortGuardado = localStorage.getItem('shortSeleccionado');
    if (shortGuardado) {
      setShortSeleccionado(shortGuardado);
    }
  }, []);

  if (!datos) return <div>Cargando vista previa...</div>;

const { modelo = 'bayern', coloresZona, colorDiseno, logos, nombreEstilo, numeroEstilo, textos } = datos;
const modeloBase = modelo.replace('_cuello_v', '');
const esCuelloV = modelo.includes('_cuello_v');
  
 const ESCALA_RENDER = 400 / 1024;
const escalaLogo = ESCALA_RENDER;
const width = `${1024 * ESCALA_RENDER}px`;
const height = `${1536 * ESCALA_RENDER}px`;

 const zonasNormales = [
  esCuelloV ? 'base_cv' : 'base',
  'detalle_de_cuello', // ✅ agregar esta línea
  esCuelloV ? 'cuelloV' : 'cuello',
  esCuelloV ? 'cuerpoV' : 'cuerpo',
  'insertos',
  esCuelloV ? 'mangasV' : 'mangas',
  'tapa-costura'
];

  const zonasDisenoPorModelo = {
    milan: ['diseno1', 'diseno2', 'diseno3', 'diseno4'],
    liberty: ['diseno1', 'diseno2'],
    iberia: ['diseno1', 'diseno2'],
    river: ['diseno1', 'diseno2'],
    cosmo: ['diseno1', 'diseno2', 'diseno3'],
  };

  const zonasDiseno = zonasDisenoPorModelo[modeloBase] 
  ? zonasDisenoPorModelo[modeloBase] 
  : [esCuelloV ? 'disenoV' : 'diseno'];

  const coloresDisponibles = [
    { hex: '#F37932', nombre: 'NARANJA ROJIZO' },
    { hex: '#F7941D', nombre: 'NARANJA' },
    { hex: '#FFB447', nombre: 'MANGO' },
    { hex: '#FFE600', nombre: 'CANARIO' },
    { hex: '#FFEE94', nombre: 'AMARILLO PASTEL' },
    { hex: '#ECCC6F', nombre: 'D. CLARO' },
    { hex: '#D2A130', nombre: 'D. OSCURO' },
    { hex: '#16635B', nombre: 'BOTELLA' },
    { hex: '#00A04D', nombre: 'BANDERA' },
    { hex: '#BED62F', nombre: 'LIMÓN' },
    { hex: '#56B497', nombre: 'AQUA VERDOSO' },
    { hex: '#39B6C0', nombre: 'AQUA AZULOSO' },
    { hex: '#80806B', nombre: 'MILITAR' },
    { hex: '#620F19', nombre: 'VINO CLARO' },
    { hex: '#AC3C39', nombre: 'BARCELONA' },
    { hex: '#F12C2C', nombre: 'ROJO' },
    { hex: '#ED4C9B', nombre: 'MAGENTA' },
    { hex: '#FFB3D1', nombre: 'ROSA CLARO' },
    { hex: '#FFD9E8', nombre: 'ROSA PASTEL' },
    { hex: '#B99FE1', nombre: 'LILA' },
    { hex: '#7449AD', nombre: 'UVA' },
    { hex: '#1D2C44', nombre: 'MARINO' },
    { hex: '#3C66B3', nombre: 'REY' },
    { hex: '#00C8EC', nombre: 'TURQUESA' },
    { hex: '#C3E7F3', nombre: 'CIELO' },
    { hex: '#D7EBF3', nombre: 'CIELO CLARO' },
    { hex: '#000000', nombre: 'NEGRO' },
    { hex: '#4A4A4A', nombre: 'GRIS OSCURO' },
    { hex: '#CACFD2', nombre: 'GRIS PLATA' },
    { hex: '#F2F3F4', nombre: 'GRIS MARCA DE AGUA' },
    { hex: '#C7E93A', nombre: 'VERDE NEÓN' },
    { hex: '#F3EF4C', nombre: 'AMARILLO NEÓN' },
    { hex: '#F2765F', nombre: 'CORAL' },
  ];

  const coloresUtilizadosUnicos = Array.from(
    new Map(
      Object.entries(coloresZona || {})
        .filter(([_, color]) => color && color !== '#ffffff')
        .map(([zona, hex]) => {
          const colorInfo = coloresDisponibles.find(c => c.hex === hex);
          return colorInfo ? [hex, { ...colorInfo, zona }] : null;
        })
        .filter(Boolean)
    ).values()
  );

const renderVista = (vista) => (
  <div style={{ position: 'relative', width, height, margin: '20px' }}>
    {/* BASE */}
    <img
  src={`/modelos_${modeloBase}/${vista}/${esCuelloV ? 'base_cv' : 'base'}.png`}
  alt="Base"
  style={{ 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width, 
    height,
    zIndex: 1 // ✅ Añadir esto
  }}
/>

    {/* SHORT */}
    {vista === 'frente' && shortSeleccionado && (
      <img
        src={`/shorts/short_${shortSeleccionado}.png`}
        alt={`Short ${shortSeleccionado}`}
        style={{
          position: 'absolute',
          top: '120px',
          left: '0',
          width,
          height: 'auto',
          zIndex: 0,
        }}
      />
    )}

    {/* ZONAS NORMALES */}
    {zonasNormales.map((zona) => (
      <div
        key={zona}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: coloresZona?.[zona] || 'transparent',
          WebkitMaskImage: `url(/modelos_${modeloBase}/${vista}/${zona}.png)`,
          maskImage: `url(/modelos_${modeloBase}/${vista}/${zona}.png)`,
          WebkitMaskSize: `${width} ${height}`,
          maskSize: `${width} ${height}`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.9,
          zIndex: 2,
        }}
      />
    ))}

    {/* DISEÑO */}
    {zonasDiseno.map((zona) => {
      const color = coloresZona?.[zona] || colorDiseno;
      return color ? (
        <div
          key={zona}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            backgroundColor: color,
            WebkitMaskImage: `url(/modelos_${modeloBase}/${vista}/${zona}.png)`,
            maskImage: `url(/modelos_${modeloBase}/${vista}/${zona}.png)`,
            WebkitMaskSize: `${width} ${height}`,
            maskSize: `${width} ${height}`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            mixBlendMode: 'normal',
            opacity: 1,
            zIndex: 3,
          }}
        />
      ) : null;
    })}

    {/* EXTRAS: textos y logos */}
  {vista === 'espalda' && (
  <>
    <img
      src={`/modelos_${modeloBase}/espalda/spiro_cuello.png`}
      style={{ position: 'absolute', top: -13, left: 0, width, height, zIndex: 3 }}
    />

    {/* Posición dinámica según tipo de cuello */}
 <img
  src={`/modelos_${modeloBase}/espalda/nombre_v${nombreEstilo}.png`}
  style={{
    position: 'absolute',
    top: `${270 * ESCALA_RENDER}px`,
    left: '75%',
    transform: 'translateX(-50%)',
    width: `${300 * ESCALA_RENDER}px`,
    height: 'auto',
    zIndex: 3,
  }}
/>
<img
  src={`/modelos_${modeloBase}/espalda/numero_23_v${numeroEstilo}.png`}
  style={{
    position: 'absolute',
    top: `${360 * ESCALA_RENDER}px`,
    left: '75%',
    transform: 'translateX(-50%)',
    width: `${1100 * ESCALA_RENDER}px`, // ajustable según proporción real del PNG
    height: 'auto',
    zIndex: 3,
  }}
/>
  </>
)}

   {vista === 'frente' && (
  <>
    <img src={`/modelos_${modeloBase}/frente/spiro_hombro.png`} style={{ position: 'absolute', top: 0, left: 0, width, height, zIndex: 3 }} />
    <img src={`/modelos_${modeloBase}/frente/spiro_triangulo_original.png`} style={{ position: 'absolute', top: 0, left: 0, width, height, zIndex: 3 }} />

{/* TEXTOS PERSONALIZADOS – IGUAL QUE LOGOS */}
{textos?.[vista]?.map((texto, index) => (
  <div
    key={index}
    style={{
      position: 'absolute',
      top: `${texto.y * ESCALA_RENDER}px`,
      left: `${texto.x * ESCALA_RENDER}px`,
      transform: `translate(0%, -30%) rotate(${texto.rotation ?? 0}deg)`,
      fontSize: `${(texto.size ?? 100) * ESCALA_RENDER}px`,
      color: texto.color || '#000',
      fontFamily: texto.fuente || 'Impact',
      fontWeight: 'bold',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      display: 'inline-block',
      pointerEvents: 'none',
      zIndex: 14,
    }}
  >
    {texto.contenido}
  </div>
))}
  </>
)}
    {logos?.[vista]?.map((logo, index) => (
      <img
        key={index}
        src={logo.url}
        alt={`Logo ${index}`}
        style={{
          position: 'absolute',
          top: `${logo.y * escalaLogo}px`,
          left: `${logo.x * escalaLogo}px`,
          width: `${logo.width * escalaLogo}px`,
          objectFit: 'contain',
          transform: `rotate(${logo.rotation}deg)`,
          zIndex: 4,
        }}
      />
    ))}
  </div>
);
  
  const handleCerrar = () => navigate('/bayern');
  const handleCotizar = () => navigate('/formulario-cotizacion');

return (
  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>

    {/* Barra superior de controles */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 auto',
        width: '1400px',
        padding: '20px 40px',
        backgroundColor: '#dfe0dd',
        borderRadius: '12px 12px 0 0',
        border: '2px solid #ccc',
        borderBottom: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* Botones de short */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['', 'blanco', 'negro', 'marino'].map((color) => (
          <button
            key={color || 'sin-short'}
            onClick={() => {
              if (color === '') {
                setShortSeleccionado('');
                localStorage.removeItem('shortSeleccionado');
              } else {
                setShortSeleccionado(color);
                localStorage.setItem('shortSeleccionado', color);
              }
            }}
            style={{
              padding: '8px 14px',
              borderRadius: '999px',
              border: '2px solid #000',
              backgroundColor: shortSeleccionado === color ? '#000' : '#fff',
              color: shortSeleccionado === color ? '#fff' : '#000',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {color === '' ? 'SIN SHORT' : `SHORT ${color.toUpperCase()}`}
          </button>
        ))}
      </div>

      {/* Título centrado */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
        VISTA PREVIA DEL DISEÑO
      </h2>

      {/* Botones de acción */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleCerrar}
          style={{
            backgroundColor: '#b5d889',
            border: '2px solid #3b3b3b',
            color: '#000',
            fontWeight: 'bold',
            padding: '10px 18px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          CERRAR VISTA PREVIA
        </button>

        <button
          onClick={() => alert('Funcionalidad de guardar en construcción')}
          style={{
            backgroundColor: '#dddddd',
            border: '2px solid #3b3b3b',
            color: '#000',
            fontWeight: 'bold',
            padding: '10px 18px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          GUARDAR
        </button>

        <button
          onClick={handleCotizar}
          style={{
            backgroundColor: '#f59d3f',
            border: '2px solid #3b3b3b',
            color: '#000',
            fontWeight: 'bold',
            padding: '10px 18px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          COTIZAR
        </button>
      </div>
    </div> {/* ← Este cierre es el que faltaba */}

    {/* Vista previa principal */}
    <div
      style={{
        width: '1400px',
        height: '900px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '2px solid #e0e0e0',
        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '40px',
        padding: '40px',
        margin: '0 auto 30px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Colores utilizados */}
      <div style={{ width: '25%', paddingRight: '20px' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>COLORES UTILIZADOS</h3>
        {coloresUtilizadosUnicos.map((color, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: color.hex, border: '1px solid #000' }}></div>
            <span style={{ fontSize: '14px' }}>{color.nombre}</span>
          </div>
        ))}
      </div>

      {/* Render de frente y espalda */}
      <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px' }}>
        {renderVista('frente')}
        {renderVista('espalda')}
      </div>
    </div>
  </div>
);
};

export default VistaPrevia;