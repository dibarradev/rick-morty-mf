import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock the microfrontends to avoid module federation issues in tests
jest.mock('characters/Characters', () => {
  return function MockCharacters() {
    return (
      <div data-testid='characters-microfrontend'>Characters Microfrontend</div>
    );
  };
});

jest.mock('characterDetail/CharacterDetail', () => {
  return function MockCharacterDetail() {
    return (
      <div data-testid='character-detail-microfrontend'>
        Character Detail Microfrontend
      </div>
    );
  };
});

const renderWithRouter = (component, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders home page by default', () => {
    renderWithRouter(<App />);
    expect(
      screen.getByText('Welcome to the Rick and Morty Universe')
    ).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /characters/i })
    ).toBeInTheDocument();
  });
});
