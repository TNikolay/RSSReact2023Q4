import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import Loader from '../../../src/components/utils/Loader';

describe('Header', () => {
  it('Loader should be', () => {
    render(<Loader />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
