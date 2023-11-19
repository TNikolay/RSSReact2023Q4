import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../../src/App';

describe('Ensure that the 404 page is displayed when navigating to an invalid route.', () => {
  it('should render - 404 page content', async () => {
    render(
      <MemoryRouter initialEntries={['/caqsseE']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText('Oops! Something went wrong. You should not be here:(')).toBeInTheDocument();
  });
});
