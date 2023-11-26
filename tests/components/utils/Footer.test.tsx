import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import Footer from '../../../components/utils/Footer';

describe('Footer', () => {
  it('Copyrite should be in footer', () => {
    render(<Footer />);
    expect(screen.getByText('TNikolay (c) 2023')).toBeInTheDocument();
  });
});
