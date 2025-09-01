import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterFilters from '../../Components/CharacterFilters/CharacterFilters';

const defaultProps = {
  filters: {
    name: '',
    status: '',
    species: '',
  },
  onFiltersChange: jest.fn(),
  onClearFilters: jest.fn(),
  loading: false,
};

describe('CharacterFilters Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all filter inputs', () => {
    render(<CharacterFilters {...defaultProps} />);

    expect(screen.getByLabelText(/search by name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/species/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /clear filters/i })
    ).toBeInTheDocument();
  });

  test('calls onFiltersChange when status dropdown changes', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters {...defaultProps} />);

    const statusSelect = screen.getByLabelText(/status/i);
    await user.selectOptions(statusSelect, 'alive');

    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith({
      status: 'alive',
    });
  });

  test('debounces name input changes', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters {...defaultProps} />);

    const nameInput = screen.getByLabelText(/search by name/i);
    await user.type(nameInput, 'Rick');

    // Should not call immediately
    expect(defaultProps.onFiltersChange).not.toHaveBeenCalled();

    // Should call after debounce delay
    await waitFor(
      () => {
        expect(defaultProps.onFiltersChange).toHaveBeenCalledWith({
          name: 'Rick',
        });
      },
      { timeout: 500 }
    );
  });

  test('calls onClearFilters when clear button is clicked', async () => {
    const user = userEvent.setup();
    const propsWithFilters = {
      ...defaultProps,
      filters: { name: 'Rick', status: 'alive', species: 'Human' },
    };

    render(<CharacterFilters {...propsWithFilters} />);

    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    await user.click(clearButton);

    expect(defaultProps.onClearFilters).toHaveBeenCalled();
  });

  test('shows active filters when filters are applied', () => {
    const propsWithFilters = {
      ...defaultProps,
      filters: { name: 'Rick', status: 'alive', species: 'Human' },
    };

    render(<CharacterFilters {...propsWithFilters} />);

    expect(screen.getByText('Active Filters:')).toBeInTheDocument();
    expect(screen.getByText('Name: "Rick"')).toBeInTheDocument();
    expect(screen.getByText('Status: alive')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
  });

  test('disables inputs when loading', () => {
    const loadingProps = { ...defaultProps, loading: true };
    render(<CharacterFilters {...loadingProps} />);

    expect(screen.getByLabelText(/search by name/i)).toBeDisabled();
    expect(screen.getByLabelText(/status/i)).toBeDisabled();
    expect(screen.getByLabelText(/species/i)).toBeDisabled();
  });
});
