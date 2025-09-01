import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Characters from '../Components/Characters';

// Mock the custom hook
jest.mock('../hooks/useCharacters', () => ({
  useCharacters: () => ({
    characters: [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        origin: { name: 'Earth (C-137)' },
        location: { name: 'Citadel of Ricks' },
        episode: ['1', '2', '3'],
      },
    ],
    pagination: {
      page: 1,
      pages: 1,
      count: 1,
      next: null,
      prev: null,
    },
    filters: {
      name: '',
      status: '',
      species: '',
    },
    loading: false,
    error: null,
    updateFilters: jest.fn(),
    clearFilters: jest.fn(),
    goToPage: jest.fn(),
    nextPage: jest.fn(),
    prevPage: jest.fn(),
    retry: jest.fn(),
  }),
}));

const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Characters Component', () => {
  test('renders characters title and subtitle', () => {
    renderWithRouter(<Characters />);

    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(
      screen.getByText('Explore the multiverse of Rick and Morty characters')
    ).toBeInTheDocument();
  });

  test('renders character cards when data is available', () => {
    renderWithRouter(<Characters />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  test('displays results count', () => {
    renderWithRouter(<Characters />);

    expect(screen.getByText('1 characters found')).toBeInTheDocument();
  });

  test('renders view toggle button', () => {
    renderWithRouter(<Characters />);

    const viewToggle = screen.getByTitle(/Switch to/);
    expect(viewToggle).toBeInTheDocument();
  });
});
