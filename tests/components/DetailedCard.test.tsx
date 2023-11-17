import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import CardList from '../../src/components/CardList';
import DetailedCard from '../../src/components/DetailedCard';
import { mockCharactersData } from '../../src/mocks/handlers/Characters';
import { store } from '../../src/store/store';

const mockData = mockCharactersData.results![0];
const onClose = vi.fn();

describe('Tests for the Detailed Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <Provider store={store}>
        <DetailedCard id={1} onClose={onClose} />
      </Provider>
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument;
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Provider store={store}>
        <DetailedCard id={1} onClose={onClose} />
      </Provider>
    );

    await waitForElementToBeRemoved(screen.queryByText('Loading...'));

    expect(screen.getByRole('heading', { name: mockData.name }));
    expect(screen.getByRole('img', { name: mockData.name }));
    expect(screen.getByText(mockData.species));
    expect(screen.getByText(mockData.gender));
    expect(screen.getByText(mockData.status));
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?page=1&details=1']}>
          <CardList itemsPerPage={10} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('DetailedCard')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close detailed card' }));
    expect(screen.queryByTestId('DetailedCard')).not.toBeInTheDocument();
  });
});
