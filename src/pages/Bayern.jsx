import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bayern.css';

const Bayern = () => {
 const [modeloActual, setModeloActual] = useState(() => localStorage.getItem('modeloElegido') || 'bayern');
  const [vistaActual, setVistaActual] = useState('frente');
  const [zonaSeleccionada, setZonaSeleccionada] = useState('');
  const [coloresZona, setColoresZona] = useState({});
  const [colorDiseno, setColorDiseno] = useState('#000000');
  const [logos, setLogos] = useState({ frente: [], espalda: [] });
  const [draggingLogoIndex, setDraggingLogoIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedLogoIndex, setSelectedLogoIndex] = useState(null);
  const [nombreEstilo, setNombreEstilo] = useState(1);
  const [numeroEstilo, setNumeroEstilo] = useState(1);
  const navigate = useNavigate();

  const [textos, setTextos] = useState({ frente: [], espalda: [] });
const esCuelloV = modeloActual.includes('_cuello_v');
const [selectedTextoIndex, setSelectedTextoIndex] = useState(null);
const [draggingTextoIndex, setDraggingTextoIndex] = useState(null);

  useEffect(() => {
  const data = localStorage.getItem('vistaPrevia');
  if (data) {
    const {
      modelo,
      coloresZona,
      colorDiseno,
      logos,
      textos,
      nombreEstilo,
      numeroEstilo,
    } = JSON.parse(data);

    if (modelo) setModeloActual(modelo);
    if (coloresZona) setColoresZona(coloresZona);
    if (colorDiseno) setColorDiseno(colorDiseno);
    if (logos) setLogos(logos);
    if (nombreEstilo) setNombreEstilo(nombreEstilo);
    if (numeroEstilo) setNumeroEstilo(numeroEstilo);
    if (textos) setTextos(textos);

    // ✅ Limpia para evitar conflictos en futuras visitas
    localStorage.removeItem('vistaPrevia');
  }
}, []);

useEffect(() => {
  const handleClickOutside = (e) => {
    const clicEnLogo = e.target.closest('.logo-container');
    const clicEnTexto = e.target.closest('.texto-movable');

    if (!clicEnLogo) setSelectedLogoIndex(null);
    if (!clicEnTexto) setSelectedTextoIndex(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Delete') {
      if (selectedLogoIndex !== null) removeLogo(selectedLogoIndex);
      if (selectedTextoIndex !== null) eliminarTexto(selectedTextoIndex);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('keydown', handleKeyDown);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [selectedLogoIndex, selectedTextoIndex]);

  const modelosDisenoEspecial = {
    milan: ['diseno1', 'diseno2', 'diseno3', 'diseno4'],
    cosmo: ['diseno1', 'diseno2', 'diseno3'],
    liberty: ['diseno1', 'diseno2'],
    iberia: ['diseno1', 'diseno2'],
    river: ['diseno1', 'diseno2'],
  };

// Definir zonas base según tipo de cuello
const zonasBase = [
  esCuelloV ? 'base_cv' : 'base',
  'detalle_de_cuello',
  esCuelloV ? 'cuelloV' : 'cuello',
  esCuelloV ? 'cuerpoV' : 'cuerpo',
  'insertos',
  esCuelloV ? 'mangasV' : 'mangas', // 👈 este es el cambio
  'tapa-costura',
];
// Diseño especial o genérico
const zonasDiseno = modelosDisenoEspecial[modeloActual.replace('_cuello_v', '')] || [
  esCuelloV ? 'disenoV' : 'diseno',
];

// Crear objeto zonasDisponibles con paths correctos
const modeloBase = modeloActual.replace('_cuello_v', '');

const zonasDisponibles = Object.fromEntries(
  [...zonasBase, ...zonasDiseno].map((zona) => [
    zona,
    `/modelos_${modeloBase}/${vistaActual}/${zona}.png`,
  ])
);
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

  const pintarZona = (color) => {
    if (zonaSeleccionada.startsWith('diseno')) {
      setColoresZona((prev) => ({ ...prev, [zonaSeleccionada]: color }));
    } else if (zonaSeleccionada === 'diseno') {
      setColorDiseno(color);
    } else {
      setColoresZona((prev) => ({ ...prev, [zonaSeleccionada]: color }));
    }
  };

  const cambiarVista = () => {
    setVistaActual((prev) => (prev === 'frente' ? 'espalda' : 'frente'));
    setSelectedLogoIndex(null);
  };

  const startDragging = (e, index) => {
    setDraggingLogoIndex(index);
    setSelectedLogoIndex(index);
    const logo = logos[vistaActual][index];
    setDragOffset({ x: e.clientX - logo.x, y: e.clientY - logo.y });
  };

  const stopDragging = () => {
  setDraggingLogoIndex(null);
  setDraggingTextoIndex(null); // ⬅️ ESTA LÍNEA FALTABA
};

  const handleMouseMove = (e) => {
    if (draggingLogoIndex !== null) {
      const updated = { ...logos };
      updated[vistaActual][draggingLogoIndex].x = e.clientX - dragOffset.x;
      updated[vistaActual][draggingLogoIndex].y = e.clientY - dragOffset.y;
      setLogos(updated);
    }
  if (draggingTextoIndex !== null) {
    const updated = { ...textos };
    updated[vistaActual][draggingTextoIndex].x = e.clientX - dragOffset.x;
    updated[vistaActual][draggingTextoIndex].y = e.clientY - dragOffset.y;
    setTextos(updated);
  }

  };

  const resizeLogo = (index, delta) => {
    const updated = { ...logos };
    updated[vistaActual][index].width = Math.max(10, updated[vistaActual][index].width + delta);
    setLogos(updated);
  };

  const rotateLogo = (index) => {
    const updated = { ...logos };
    updated[vistaActual][index].rotation = (updated[vistaActual][index].rotation + 15) % 360;
    setLogos(updated);
  };

  const removeLogo = (index) => {
    const updated = { ...logos };
    updated[vistaActual].splice(index, 1);
    setLogos(updated);
    setSelectedLogoIndex(null);
  };

  const agregarLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = { ...logos };
        updated[vistaActual].push({ url: reader.result, x: 400, y: 200, width: 150, rotation: 0 });
        setLogos(updated);
      };
      reader.readAsDataURL(file);
    }
  };


const actualizarTexto = (i, cambios) => {
  const copia = { ...textos };
  copia[vistaActual][i] = { ...copia[vistaActual][i], ...cambios };
  setTextos(copia);
};

const eliminarTexto = (i) => {
  const copia = { ...textos };
  copia[vistaActual].splice(i, 1);
  setTextos(copia);
  setSelectedTextoIndex(null);
};

  const cambiarEstiloNombre = () => setNombreEstilo((prev) => (prev === 1 ? 2 : 1));
  const cambiarEstiloNumero = () => setNumeroEstilo((prev) => (prev === 1 ? 2 : 1));

  const handlePrevisualizar = () => {
    let coloresFinal = { ...coloresZona };
    const zonasDiseno = modelosDisenoEspecial[modeloActual];
    if (zonasDiseno) {
      zonasDiseno.forEach((zona) => {
        if (!coloresFinal[zona]) coloresFinal[zona] = '#ffffff';
      });
    }

    localStorage.setItem(
      'vistaPrevia',
      JSON.stringify({
        modelo: modeloActual,
        coloresZona: coloresFinal,
        colorDiseno,
        logos,
        textos,
        nombreEstilo,
        numeroEstilo,
      })
    );
    navigate('/vista-previa');
  };

return (
  <div onMouseMove={handleMouseMove} onMouseUp={stopDragging}>
    <div className="editor-container">
      <div className="header-superior">
<div className="bloque-izquierdo">
  <label htmlFor="logo-upload" className="subir-logos">SUBIR LOGO</label>
  <input
    id="logo-upload"
    type="file"
    accept="image/*"
    style={{ display: 'none' }}
    onChange={agregarLogo}
  />
  
  <button
    className="subir-logos"
    onClick={() => {
      const nuevoTexto = {
        contenido: 'Texto aquí',
        x: 312,
        y: 550,
        size: 98,
        rotation: 0,
        color: '#000000',
        fuente: 'Impact',
      };
      setTextos((prev) => ({
        ...prev,
        [vistaActual]: [...prev[vistaActual], nuevoTexto],
      }));
    }}
  >
    AGREGAR TEXTO
  </button>

  <button className="boton-rojo" onClick={handlePrevisualizar}>PREVISUALIZAR</button>
</div>

  <div className="modelo-titulo">
    <h2>{`MODELO ${modeloActual.replace('_cuello_v', '').toUpperCase()}`}</h2>
    <span>COLOREA TU PLAYERA</span>
  </div>

  <div className="bloque-derecho">
    <button className="boton-grande-verde" onClick={cambiarVista}>
  {vistaActual === 'frente' ? 'CAMBIAR\nA ESPALDA' : 'CAMBIAR\nAL FRENTE'}
</button>
    <button className="boton-grande-naranja" onClick={() => navigate('/elegir-modelo')}>
      CAMBIAR<br />MODELO
    </button>
  </div>
</div>
           <div className="main-editor">
  {/* Columna central: Render de la camiseta centrada */}
  <div className="camiseta-render">
    <div style={{ position: 'relative', width: 1024, height: 1536 }}>
  {zonasDisponibles[esCuelloV ? 'base_cv' : 'base'] && (
  <img
    src={zonasDisponibles[esCuelloV ? 'base_cv' : 'base']}
    onError={(e) => (e.target.style.display = 'none')}
    style={{ position: 'absolute', top: 0, left: 0, width: 1024, height: 1536 }}
    alt="base"
  />
)}
      {[...zonasBase, ...zonasDiseno].map((zona) => {
        const mascara = zonasDisponibles[zona];
        if (!mascara) return null;
        const esDiseno = zona.startsWith('diseno');
        return (
          <div
            key={zona}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 1024,
              height: 1536,
              backgroundColor: coloresZona[zona] ?? (esDiseno ? colorDiseno : 'transparent'),
              WebkitMaskImage: `url(${mascara})`,
              maskImage: `url(${mascara})`,
              WebkitMaskSize: '1024px 1536px',
              maskSize: '1024px 1536px',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              mixBlendMode: esDiseno ? 'normal' : 'multiply',
              opacity: esDiseno ? 1 : 0.9,
              pointerEvents: 'none',
              zIndex: zona === 'tapa-costura' ? 10 : 1,
            }}
          />
        );
      })}
      {vistaActual === 'espalda' && (
        <>
          <img src={`/modelos_${modeloBase}/espalda/spiro_cuello.png`} style={{ position: 'absolute', top:'-30px', left: 0, width: 1024, height: 1536, zIndex: 3 }} />
 
    {/* SOLO CAMBIAMOS EL PATH DE NOMBRE Y NÚMERO */}
    <img
      src={`/modelos_${modeloBase}/espalda/nombre_v${nombreEstilo}.png`}
      onClick={cambiarEstiloNombre}
      style={{
        position: 'absolute',
        top: '270px',
        left: '360px',
        width: '300px',
        height: 'auto',
        zIndex: 4,
        cursor: 'pointer',
      }}
    />
    <img
      src={`/modelos_${modeloBase}/espalda/numero_23_v${numeroEstilo}.png`}
      onClick={cambiarEstiloNumero}
      style={{
        position: 'absolute',
        top: '360px',
        left: 0,
        width: 1024,
        height: 1236,
        zIndex: 4,
        cursor: 'pointer',
      }}
    />
  </>
)}
      {vistaActual === 'frente' && (
        <>
          <img src={`/modelos_${modeloBase}/frente/spiro_hombro.png`} style={{ position: 'absolute', top: 0, left: 0, width: 1024, height: 1536, zIndex: 3, pointerEvents: 'none' }} />
          <img src={`/modelos_${modeloBase}/frente/spiro_triangulo_original.png`} style={{ position: 'absolute', top: 0, left: 0, width: 1024, height: 1536, zIndex: 3, pointerEvents: 'none' }} />
        </>
      )}
      {logos[vistaActual].map((logo, i) => (
        <div
          key={i}
          className="logo-container"
          style={{
            position: 'absolute',
            top: logo.y,
            left: logo.x,
            width: logo.width,
            transform: `rotate(${logo.rotation}deg)`,
            zIndex: 4,
            cursor: 'move',
            outline: selectedLogoIndex === i ? '2px solid #007bff' : 'none',
          }}
          onMouseDown={(e) => startDragging(e, i)}
          onClick={() => setSelectedLogoIndex(i)}
        >
          <img src={logo.url} alt={`Logo ${i}`} style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }} />
          {selectedLogoIndex === i && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 4 }}>
              <button onClick={() => resizeLogo(i, 10)}>+</button>
              <button onClick={() => resizeLogo(i, -10)}>-</button>
              <button onClick={() => rotateLogo(i)}>⤾</button>
              <button onClick={() => removeLogo(i)}>✖</button>
            </div>
          )}
        </div>
      ))}

{textos[vistaActual].map((t, i) => (
  <div
    key={`txt-${i}`}
    className={`texto-movable ${selectedTextoIndex === i ? 'texto-activo' : ''}`}
    style={{
      position: 'absolute',
      top: t.y,
      left: t.x,
      transform: `rotate(${t.rotation}deg)`,
      fontSize: `${t.size}px`,
      color: t.color,
      fontFamily: t.fuente,
      zIndex: 5,
      cursor: 'move',
      userSelect: 'none',
      fontWeight: 'bold',
    }}
    onMouseDown={(e) => {
      setDraggingLogoIndex(null);
      setSelectedLogoIndex(null);
      setSelectedTextoIndex(i);
      setDragOffset({ x: e.clientX - t.x, y: e.clientY - t.y });
      setDraggingTextoIndex(i);
    }}
    onClick={() => setSelectedTextoIndex(i)}
  >
    {selectedTextoIndex === i ? (
      <>
        {/* ✅ Encapsulamos controles en contenedor sin estilos de texto */}
        <div style={{ transform: 'none', fontSize: 'initial', fontFamily: 'initial', color: 'initial' }}>
          <select
            value={t.fuente}
            onChange={(e) => actualizarTexto(i, { fuente: e.target.value })}
          >
            <option value="Impact">Impact</option>
            <option value="SoccerLeague">Soccer League</option>
            <option value="SoccerLeagueCollege">Soccer College</option>
            <option value="Arsenal">Arsenal UDL</option>
          </select>

          <select
            value={t.color}
            onChange={(e) => actualizarTexto(i, { color: e.target.value })}
          >
            {coloresDisponibles.map((c) => (
              <option key={c.hex} value={c.hex}>{c.nombre}</option>
            ))}
          </select>
        </div>

        {/* Input de texto sí mantiene estilos visuales */}
        <input
          type="text"
          value={t.contenido}
          onChange={(e) => actualizarTexto(i, { contenido: e.target.value })}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontSize: `${t.size}px`,
            color: t.color,
            fontFamily: t.fuente,
            transform: `rotate(${t.rotation}deg)`,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontWeight: 'bold',
            width: 'auto',
          }}
        />
      </>
    ) : (
      t.contenido
    )}

    {selectedTextoIndex === i && (
      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
        <button onClick={() => actualizarTexto(i, { size: t.size + 2 })}>+</button>
        <button onClick={() => actualizarTexto(i, { size: Math.max(10, t.size - 2) })}>-</button>
        <button onClick={() => actualizarTexto(i, { rotation: (t.rotation + 15) % 360 })}>⤾</button>
        <button onClick={() => eliminarTexto(i)}>✖</button>
      </div>
    )}
  </div>
))}

    </div>
  </div>

  {/* Columna lateral derecha: Select + paleta */}
  <div className="control-panel">
  <select
  value={zonaSeleccionada}
  onChange={(e) => setZonaSeleccionada(e.target.value)}
  style={{ marginBottom: '16px' }}
>
  <option value="">Seleccionar zona</option>
 {[...zonasBase, ...zonasDiseno]
  .filter(z => z !== 'base' && z !== 'base_cv')
  .map((z) => {
    let label = z;

    if (z === 'cuello' || z === 'cuelloV') label = 'Cuello y Puños';
    else if (z === 'mangas' || z === 'mangasV') label = 'Mangas y Espalda';
    else if (z === 'detalle_de_cuello') label = 'Detalle de Cuello';
    else if (z === 'tapa-costura') label = 'Tapa Costura';
    else if (z === 'cuerpoV') label = 'Cuerpo (Cuello V)';
    else if (z === 'cuerpo') label = 'Cuerpo';
    else if (z.startsWith('diseno')) label = 'Color Diseño';

    return (
      <option key={z} value={z}>
        {label}
      </option>
    );
  })}
</select>

 {zonaSeleccionada && (
  <div className="paleta-scroll">
    {coloresDisponibles.map((c) => (
      <div
        key={c.hex}
        onClick={() => pintarZona(c.hex)}
        className="color-opcion"
        title={c.nombre}
      >
        <div className="color-circulo" style={{ backgroundColor: c.hex }} />
        <span>{c.nombre}</span>
      </div>
    ))}
  </div>
)}
{/* ← cierra control-panel */}
</div>

{/* ← cierra main-editor */}
</div>

{/* ← cierra editor-container */}
</div>

{/* ← cierra div principal */}
</div>

  );
};

export default Bayern;
