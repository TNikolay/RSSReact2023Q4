import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import CardList from '../../src/components/CardList';
import { CharactersProvider } from '../../src/contexts/CharactersContext';
import { QueryProvider } from '../../src/contexts/QueryContext';

describe('Card List', () => {
  let len = 10;

  it(`should render ${len} cards`, async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryProvider>
          <CharactersProvider>
            <CardList itemsPerPage={len} />
          </CharactersProvider>
        </QueryProvider>
      </MemoryRouter>
    );
    expect(await screen.findAllByTestId('CardListItem')).toHaveLength(len);
  });

  len = 20;
  it(`should render ${len} cards`, async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryProvider>
          <CharactersProvider>
            <CardList itemsPerPage={len} />
          </CharactersProvider>
        </QueryProvider>
      </MemoryRouter>
    );
    expect(await screen.findAllByTestId('CardListItem')).toHaveLength(len);
  });

  len = 40;
  it(`should render ${len} cards`, async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryProvider>
          <CharactersProvider>
            <CardList itemsPerPage={len} />
          </CharactersProvider>
        </QueryProvider>
      </MemoryRouter>
    );
    expect(await screen.findAllByTestId('CardListItem')).toHaveLength(len);
  });
});
