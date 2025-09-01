import React from 'react';
import CharacterDetailComponent from './CharacterDetail';

/**
 * Entry point for CharacterDetail microfrontend when used as a remote module
 * This wrapper ensures the component works correctly in Module Federation
 */
const CharacterDetailRemote = () => {
  return <CharacterDetailComponent />;
};

export default CharacterDetailRemote;
