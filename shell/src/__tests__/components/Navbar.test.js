import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar Component', () => {
  test('renders brand logo and navigation links', () => {
    renderWithRouter(<Navbar />);

    // Check for navigation links
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /characters/i })
    ).toBeInTheDocument();
  });

  test('has accessible navigation structure', () => {
    renderWithRouter(<Navbar />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', {
      name: /toggle navigation/i,
    });
    expect(toggleButton).toBeInTheDocument();
  });

  test('renders fallback text when logo fails to load', () => {
    renderWithRouter(<Navbar />);

    const logo = screen.getByAltText('Rick and Morty');
    expect(logo).toBeInTheDocument();
  });
});
