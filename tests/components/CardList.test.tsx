import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import CardList from '../../src/components/CardList';
import { API_BASE_URL } from '../../src/constants';
import { CharactersProvider } from '../../src/contexts/CharactersContext';
import { QueryProvider } from '../../src/contexts/QueryContext';
import { server } from '../../src/mocks/node';

describe('Card List Check that an appropriate message is displayed if no cards are present.', () => {
  it('should render - Sorry, there is no data for your requiest', async () => {
    server.use(
      http.get(API_BASE_URL + '/character', () => {
        return HttpResponse.json({}, { status: 404 });
      })
    );

    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryProvider>
          <CharactersProvider>
            <CardList itemsPerPage={20} />
          </CharactersProvider>
        </QueryProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Sorry, there is no data for your requiest')).toBeInTheDocument();
    expect(screen.queryByTestId('CardListItem')).not.toBeInTheDocument();
  });
});

describe('Card List - Verify that the component renders the specified number of cards', () => {
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
