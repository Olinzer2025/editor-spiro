import React from 'react';
import CarruselSelector from './CarruselSelector';

const ElegirModelo = () => {
  return (
    <div style={{ padding: '40px 0', backgroundColor: '#000', minHeight: '100vh' }}>
      <h1 style={{
        textAlign: 'center',
        color: '#fff',
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '30px',
        fontFamily: 'Arial, sans-serif'
      }}>
       DESLIZA PARA ELEGIR TU MODELO
      </h1>
      <CarruselSelector />
    </div>
  );
};

export default ElegirModelo;