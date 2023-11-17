import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Card from '../../src/components/Card';
import CardList from '../../src/components/CardList';
import { mockCharactersData } from '../../src/mocks/handlers/Characters';
import { store } from '../../src/store/store';

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
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <CardList itemsPerPage={10} />
        </MemoryRouter>
      </Provider>
    );

    const card1 = await screen.findByRole('heading', { name: mockData.name });
    expect(screen.queryByTestId('DetailedCard')).not.toBeInTheDocument();
    fireEvent.click(card1);
    expect(screen.queryByTestId('DetailedCard')).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <CardList itemsPerPage={10} />
        </MemoryRouter>
      </Provider>
    );

    // TODO
    // const card = await screen.findByRole('heading', { name: mockData.name });

    // const moackAxios = vi.spyOn(global.fetch);

    // fireEvent.click(card);
    // expect(moackAxios).toBeCalledTimes(1);
    // expect(moackAxios).toBeCalledWith('character/1');
  });
});
