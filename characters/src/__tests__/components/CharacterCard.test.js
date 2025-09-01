import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from '../../Components/CharacterCard/CharacterCard';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  origin: { name: 'Earth (C-137)' },
  location: { name: 'Citadel of Ricks' },
  episode: ['1', '2', '3'],
};

describe('CharacterCard Component', () => {
  test('renders character information correctly', () => {
    const mockOnClick = jest.fn();
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('● Alive')).toBeInTheDocument();
    expect(screen.getByText('Episodes: 3')).toBeInTheDocument();
  });

  test('calls onClick when card is clicked', () => {
    const mockOnClick = jest.fn();
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockCharacter);
  });

  test('handles keyboard navigation', () => {
    const mockOnClick = jest.fn();
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.keyPress(card, { key: 'Enter', code: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledWith(mockCharacter);
  });

  test('renders different status badges correctly', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' };
    const { rerender } = render(
      <CharacterCard character={deadCharacter} onClick={jest.fn()} />
    );

    expect(screen.getByText('● Dead')).toBeInTheDocument();

    const unknownCharacter = { ...mockCharacter, status: 'unknown' };
    rerender(
      <CharacterCard character={unknownCharacter} onClick={jest.fn()} />
    );

    expect(screen.getByText('? unknown')).toBeInTheDocument();
  });

  test('renders in list view mode', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onClick={jest.fn()}
        viewMode='list'
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/Species:/)).toBeInTheDocument();
    expect(screen.getByText(/Gender:/)).toBeInTheDocument();
  });
});
