import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  test('renders with default props', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders with custom message', () => {
    const customMessage = 'Please wait...';
    render(<LoadingSpinner message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  test('renders without message when message is empty', () => {
    render(<LoadingSpinner message='' />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('applies correct size class', () => {
    const { container } = render(<LoadingSpinner size='large' />);
    const spinner = container.querySelector('.large');
    expect(spinner).toBeInTheDocument();
  });
});
