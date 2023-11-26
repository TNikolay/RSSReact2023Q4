import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { describe, expect, it, vi } from 'vitest';
import Card from '../../components/Card';
import CardList from '../../components/CardList';
import { mockCharactersData } from '../../mocks/handlers/Characters';

const mockData = mockCharactersData.results![0];

vi.mock('next/router', () => {
  const router = {
    push: vi.fn(),
    pathname: '/',
    route: '',
    asPath: '',
    query: {},
  };
  return { useRouter: vi.fn().mockReturnValue(router) };
});

describe('Tests for the Card List component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    const onClick = vi.fn();

    render(<Card data={mockData} onClick={onClick} />);

    expect(screen.getByRole('heading', { name: mockData.name }));
    expect(screen.getByRole('img', { name: mockData.name }));
    expect(screen.getByText(`${mockData.species}, ${mockData.gender}, ${mockData.status}`));
  });

  it('Validate that clicking on a card triggers fetch a new page with detailed information.', async () => {
    render(
      <CardList
        page={1}
        itemsPerPage={20}
        characterId={0}
        character={null}
        characters={mockCharactersData.results!}
        total={mockCharactersData.results!.length}
      />
    );

    const card1 = await screen.findByRole('heading', { name: mockData.name });
    expect(screen.queryByTestId('DetailedCard')).not.toBeInTheDocument();
    fireEvent.click(card1);

    expect(useRouter().push).toBeCalledTimes(1);
    expect(useRouter().push).toBeCalledWith({
      pathname: '/',
      query: { id: '1' },
    });
  });
});
