import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import ErrorMessage from '../../../components/utils/ErrorMessage';

describe('Header', () => {
  it('Error should print error message text', () => {
    const errorMessageTest = 'test error';

    render(<ErrorMessage error={errorMessageTest} />);

    expect(screen.getByText(errorMessageTest)).toBeInTheDocument();
  });
});
