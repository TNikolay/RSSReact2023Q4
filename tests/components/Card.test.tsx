import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Card from '../../src/components/Card';
import CardList from '../../src/components/CardList';
import { CharactersProvider } from '../../src/contexts/CharactersContext';
import { QueryProvider } from '../../src/contexts/QueryContext';
import { mockCharactersData } from '../../src/mocks/handlers/Characters';

const mockData = mockCharactersData.results![0];

describe('Tests for the Card List component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    const onClick = vi.fn();

    render(<Card data={mockData} onClick={onClick} />);

    expect(screen.getByRole('heading', { name: mockData.name }));
    expect(screen.getByRole('img', { name: mockData.name }));
    expect(screen.getByText(`${mockData.species}, ${mockData.gender}, ${mockData.status}`));
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryProvider>
          <CharactersProvider>
            <CardList itemsPerPage={10} />
          </CharactersProvider>
        </QueryProvider>
      </MemoryRouter>
    );

    const card1 = await screen.findByRole('heading', { name: mockData.name });
    expect(screen.queryByTestId('DetailedCard')).not.toBeInTheDocument();
    fireEvent.click(card1);
    expect(screen.queryByTestId('DetailedCard')).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryProvider>
          <CharactersProvider>
            <CardList itemsPerPage={10} />
          </CharactersProvider>
        </QueryProvider>
      </MemoryRouter>
    );

    const card1 = await screen.findByRole('heading', { name: mockData.name });
    const moackAxios = vi.spyOn(axios, 'get');
    fireEvent.click(card1);

    expect(moackAxios).toBeCalledTimes(1);
    expect(moackAxios).toBeCalledWith('character/1');
  });
});
