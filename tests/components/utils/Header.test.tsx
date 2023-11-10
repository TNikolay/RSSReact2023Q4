import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from '../../../src/components/utils/Header';

describe('Header', () => {
  it('"Home" should be in header', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    const linkHome = screen.getByText('Home');
    expect(linkHome).toBeInTheDocument();
    expect(linkHome).toHaveAttribute('href', '/');

    const linkAbout = screen.getByText('About');
    expect(linkAbout).toBeInTheDocument();
    expect(linkAbout).toHaveAttribute('href', '/about');
  });
});
