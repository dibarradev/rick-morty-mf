import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EpisodesList from '../../Components/EpisodesList/EpisodesList';

const mockEpisodes = [
  {
    id: 1,
    name: 'Pilot',
    episode: 'S01E01',
    air_date: 'December 2, 2013',
    characters: ['1', '2'],
  },
  {
    id: 2,
    name: 'Lawnmower Dog',
    episode: 'S01E02',
    air_date: 'December 9, 2013',
    characters: ['1', '2', '3'],
  },
  {
    id: 3,
    name: 'Anatomy Park',
    episode: 'S01E03',
    air_date: 'December 16, 2013',
    characters: ['1', '2', '4'],
  },
];

describe('EpisodesList Component', () => {
  test('renders episodes list with correct count', () => {
    render(
      <EpisodesList episodes={mockEpisodes} characterName='Rick Sanchez' />
    );

    expect(screen.getByText('Episodes (3)')).toBeInTheDocument();
    expect(
      screen.getByText('All episodes featuring Rick Sanchez')
    ).toBeInTheDocument();
  });

  test('renders episode cards', () => {
    render(
      <EpisodesList episodes={mockEpisodes} characterName='Rick Sanchez' />
    );

    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();
    expect(screen.getByText('Anatomy Park')).toBeInTheDocument();
  });

  test('renders episode badges and dates', () => {
    render(
      <EpisodesList episodes={mockEpisodes} characterName='Rick Sanchez' />
    );

    expect(screen.getByText('S01E01')).toBeInTheDocument();
    expect(screen.getByText('December 2, 2013')).toBeInTheDocument();
  });

  test('filters episodes by search term', async () => {
    const user = userEvent.setup();
    render(
      <EpisodesList episodes={mockEpisodes} characterName='Rick Sanchez' />
    );

    const searchInput = screen.getByPlaceholderText(/search episodes/i);
    await user.type(searchInput, 'Pilot');

    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.queryByText('Lawnmower Dog')).not.toBeInTheDocument();
  });

  test('shows "Show All" button when more than 6 episodes', () => {
    const manyEpisodes = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Episode ${i + 1}`,
      episode: `S01E${String(i + 1).padStart(2, '0')}`,
      air_date: 'December 2, 2013',
      characters: ['1'],
    }));

    render(
      <EpisodesList episodes={manyEpisodes} characterName='Rick Sanchez' />
    );

    expect(screen.getByText('Show All 8 Episodes')).toBeInTheDocument();
  });

  test('shows no results message when search yields no results', async () => {
    const user = userEvent.setup();
    render(
      <EpisodesList episodes={mockEpisodes} characterName='Rick Sanchez' />
    );

    const searchInput = screen.getByPlaceholderText(/search episodes/i);
    await user.type(searchInput, 'NonExistent');

    expect(
      screen.getByText(/no episodes found matching "nonexistent"/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /clear search/i })
    ).toBeInTheDocument();
  });

  test('clears search when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <EpisodesList episodes={mockEpisodes} characterName='Rick Sanchez' />
    );

    const searchInput = screen.getByPlaceholderText(/search episodes/i);
    await user.type(searchInput, 'NonExistent');

    const clearButton = screen.getByRole('button', { name: /clear search/i });
    await user.click(clearButton);

    expect(searchInput.value).toBe('');
    expect(screen.getByText('Pilot')).toBeInTheDocument();
  });
});
