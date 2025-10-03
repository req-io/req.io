import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from '../../src/components/Spinner';

describe('Spinner Component', () => {
  it('renders spinner container and spinner div', () => {
    const { container } = render(<Spinner />);
    const containerDiv = container.querySelector('.spinner-container');
    const spinnerDiv = container.querySelector('.spinner');

    expect(containerDiv).toBeInTheDocument();
    expect(spinnerDiv).toBeInTheDocument();
  });

  it('renders only the default structure', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.spinner-container')?.children.length).toBe(1);
    expect(container.querySelector('.spinner')?.parentElement).toHaveClass('spinner-container');
  });

});
