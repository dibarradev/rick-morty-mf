import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterDetail from '../Components/CharacterDetail';

// Mock the custom hook
jest.mock('../hooks/useCharacterDetail', () => ({
  useCharacterDetail: () => ({
    character: {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      origin: { name: 'Earth (C-137)' },
      location: { name: 'Citadel of Ricks' },
      episode: ['1', '2', '3'],
      created: '2017-11-04T18:48:46.250Z',
    },
    episodes: [
      {
        id: 1,
        name: 'Pilot',
        episode: 'S01E01',
        air_date: 'December 2, 2013',
        characters: ['1', '2'],
      },
    ],
    location: {
      id: 3,
      name: 'Citadel of Ricks',
      type: 'Space station',
      dimension: 'unknown',
      residents: ['1', '2', '3'],
      created: '2017-11-04T19:56:56.821Z',
    },
    loading: false,
    error: null,
    retry: jest.fn(),
    goBack: jest.fn(),
  }),
}));

const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('CharacterDetail Component', () => {
  test('renders character information correctly', async () => {
    renderWithRouter(<CharacterDetail />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Human')).toBeInTheDocument();
      expect(screen.getByText('Male')).toBeInTheDocument();
    });
  });

  test('renders back button', () => {
    renderWithRouter(<CharacterDetail />);

    expect(
      screen.getByRole('button', { name: /back to characters/i })
    ).toBeInTheDocument();
  });

  test('renders episodes section', async () => {
    renderWithRouter(<CharacterDetail />);

    await waitFor(() => {
      expect(screen.getByText(/episodes \(1\)/i)).toBeInTheDocument();
      expect(screen.getByText('Pilot')).toBeInTheDocument();
    });
  });

  test('renders location information', async () => {
    renderWithRouter(<CharacterDetail />);

    await waitFor(() => {
      expect(screen.getByText('Location Information')).toBeInTheDocument();
      expect(screen.getByText('Origin')).toBeInTheDocument();
      expect(screen.getByText('Current Location')).toBeInTheDocument();
    });
  });

  test('renders quick stats', async () => {
    renderWithRouter(<CharacterDetail />);

    await waitFor(() => {
      expect(screen.getByText('Quick Stats')).toBeInTheDocument();
      expect(screen.getByText('Episodes')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });
  });
});
