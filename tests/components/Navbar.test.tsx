import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from '../../src/components/Navbar';

describe('Navbar', () => {
  it('should display the items passed in props', () => {
    const itemsConfig = [
      { name: 'body', label: 'Body', isActive: false, onClick: () => ({}) },
      { name: 'headers', label: 'Headers', isActive: true, onClick: () => ({}) },
    ];
    render(<Navbar items={itemsConfig} />);

    expect(screen.queryByRole('list')).toBeInTheDocument();
    const navItems = screen.getAllByRole('listitem');
    expect(navItems).toHaveLength(2);
    expect(navItems[0]).toHaveTextContent('Body');
    expect(navItems[0]).not.toHaveClass('active');
    expect(navItems[1]).toHaveTextContent('Headers');
    expect(navItems[1]).toHaveClass('active');
  });

  it('should display badge when badge prop is provided and greater than 0', () => {
    const itemsConfig = [
      { name: 'headers', label: 'Headers', isActive: true, onClick: () => ({}), badge: 3 },
    ];
    render(<Navbar items={itemsConfig} />);

    const badge = screen.getByText('3');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge');
  });

  it('should not display badge when badge prop is null', () => {
    const itemsConfig = [
      { name: 'headers', label: 'Headers', isActive: true, onClick: () => ({}), badge: null },
    ];
    render(<Navbar items={itemsConfig} />);

    expect(screen.queryByText('Headers')).not.toHaveClass('badge');
  });
});
