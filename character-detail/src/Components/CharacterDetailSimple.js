import React from 'react';

/**
 * Componente CharacterDetail simplificado para debugging
 * Versión mínima para probar Module Federation
 */
const CharacterDetailSimple = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Character Detail</h1>
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
          Este es el microfrontend CharacterDetail ejecutándose desde el puerto
          3002
        </p>
      </div>
    </div>
  );
};

export default CharacterDetailSimple;
