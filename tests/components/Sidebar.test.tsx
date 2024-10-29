import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Sidebar from '../../src/components/Sidebar';
import '@testing-library/jest-dom';

describe('Sidebar', () => {
  const mockcollectionsAction = vi.fn();
  const mockenvironmentsAction = vi.fn();

  const items = [
    {
      icon: <div>collections</div>,
      label: 'collections',
      action: mockcollectionsAction,
      active: true,
    },
    {
      icon: <div>environments</div>,
      label: 'environments',
      action: mockenvironmentsAction,
      active: false,
    },
  ];

  it('should render the component correctly', () => {
    render(<Sidebar items={items} />);

    expect(screen.getByTestId('collections')).toBeInTheDocument();
    expect(screen.getByTestId('environments')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('should render the correct active item', () => {
    render(<Sidebar items={items} />);

    expect(screen.getByTestId('collections')).toHaveClass('active');
    expect(screen.getByTestId('environments')).not.toHaveClass('active');
  });

  it('should trigger the correct action when an item is clicked', () => {
    render(<Sidebar items={items} />);

    fireEvent.click(screen.getByTestId('collections'));
    expect(mockcollectionsAction).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('environments'));
    expect(mockenvironmentsAction).toHaveBeenCalledTimes(1);
  });
});
