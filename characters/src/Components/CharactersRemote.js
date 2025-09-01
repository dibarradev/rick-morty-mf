import React from 'react';
import CharactersComponent from './Characters';

/**
 * Entry point for Characters microfrontend when used as a remote module
 * This wrapper ensures the component works correctly in Module Federation
 */
const CharactersRemote = () => {
  return <CharactersComponent />;
};

export default CharactersRemote;
