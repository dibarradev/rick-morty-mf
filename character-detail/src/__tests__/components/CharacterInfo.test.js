import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterInfo from '../../Components/CharacterInfo/CharacterInfo';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  type: '',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  origin: { name: 'Earth (C-137)' },
  location: { name: 'Citadel of Ricks' },
  episode: ['1', '2', '3'],
  created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterInfo Component', () => {
  test('renders character basic information', () => {
    render(<CharacterInfo character={mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  test('renders character image', () => {
    render(<CharacterInfo character={mockCharacter} />);

    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
  });

  test('renders status badge correctly', () => {
    render(<CharacterInfo character={mockCharacter} />);

    expect(screen.getAllByText(/● Alive/)).toHaveLength(2); // One in overlay, one in info grid
  });

  test('renders origin and location information', () => {
    render(<CharacterInfo character={mockCharacter} />);

    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
  });

  test('renders metadata with formatted date', () => {
    render(<CharacterInfo character={mockCharacter} />);

    expect(screen.getByText(/November 4, 2017/)).toBeInTheDocument();
    expect(screen.getByText('3 appearances')).toBeInTheDocument();
  });

  test('handles missing type field', () => {
    render(<CharacterInfo character={mockCharacter} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  test('renders different status badges', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' };
    const { rerender } = render(<CharacterInfo character={deadCharacter} />);

    expect(screen.getAllByText(/● Dead/)).toHaveLength(2);

    const unknownCharacter = { ...mockCharacter, status: 'unknown' };
    rerender(<CharacterInfo character={unknownCharacter} />);

    expect(screen.getAllByText(/\? unknown/)).toHaveLength(2);
  });
});
