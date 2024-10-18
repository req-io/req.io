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
});
