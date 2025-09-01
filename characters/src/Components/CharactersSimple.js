import React from 'react';

/**
 * Componente Characters simplificado para debugging
 * Versión mínima para probar Module Federation
 */
const CharactersSimple = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Rick and Morty Characters</h1>
      <p>Microfrontend cargado correctamente! 🎉</p>
      <div
        style={{
          background: '#1a1d29',
          padding: '20px',
          borderRadius: '8px',
          color: '#fff',
        }}
      >
        <h3>Status: ✅ Module Federation funcionando</h3>
        <p>
          Este es el microfrontend Characters ejecutándose desde el puerto 3001
        </p>
      </div>
    </div>
  );
};

export default CharactersSimple;
