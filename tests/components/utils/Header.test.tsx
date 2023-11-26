import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import Header from '../../../components/utils/Header';

describe('Header', () => {
  it('"Home" should be in header', () => {
    render(<Header />);

    const linkHome = screen.getByText('Home');
    expect(linkHome).toBeInTheDocument();
    expect(linkHome).toHaveAttribute('href', '/');

    const linkAbout = screen.getByText('About');
    expect(linkAbout).toBeInTheDocument();
    expect(linkAbout).toHaveAttribute('href', '/about');
  });
});
