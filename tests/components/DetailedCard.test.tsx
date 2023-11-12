import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import CardList from '../../src/components/CardList';
import DetailedCard from '../../src/components/DetailedCard';
import { CharactersProvider } from '../../src/contexts/CharactersContext';
import { QueryProvider } from '../../src/contexts/QueryContext';
import { mockCharactersData } from '../../src/mocks/handlers/Characters';

const mockData = mockCharactersData.results![0];
const onClose = vi.fn();

describe('Tests for the Detailed Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(<DetailedCard id={1} onClose={onClose} />);

    expect(await screen.findByText('Loading...')).toBeInTheDocument;
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(<DetailedCard id={1} onClose={onClose} />);

    await waitForElementToBeRemoved(screen.queryByText('Loading...'));

    expect(screen.getByRole('heading', { name: mockData.name }));
    expect(screen.getByRole('img', { name: mockData.name }));
    expect(screen.getByText(mockData.species));
    expect(screen.getByText(mockData.gender));
    expect(screen.getByText(mockData.status));
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <MemoryRouter initialEntries={['/?page=1&details=1']}>
        <QueryProvider>
          <CharactersProvider>
            <CardList itemsPerPage={10} />
          </CharactersProvider>
        </QueryProvider>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('DetailedCard')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close detailed card' }));
    expect(screen.queryByTestId('DetailedCard')).not.toBeInTheDocument();
  });
});
