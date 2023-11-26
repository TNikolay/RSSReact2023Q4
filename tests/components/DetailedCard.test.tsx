import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { describe, expect, it, vi } from 'vitest';
import CardList from '../../components/CardList';
import DetailedCard from '../../components/DetailedCard';
import { mockCharactersData } from '../../mocks/handlers/Characters';

const mockData = mockCharactersData.results![0];
const onClose = vi.fn();

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

describe('Tests for the Detailed Card component', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(<DetailedCard character={mockData} onClose={onClose} />);

    expect(screen.getByRole('heading', { name: mockData.name }));
    expect(screen.getByRole('img', { name: mockData.name }));
    expect(screen.getByText(mockData.species));
    expect(screen.getByText(mockData.gender));
    expect(screen.getByText(mockData.status));
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <CardList
        page={1}
        itemsPerPage={20}
        characterId={1}
        character={mockData}
        characters={mockCharactersData.results!}
        total={mockCharactersData.results!.length}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close detailed card' }));

    expect(useRouter().push).toBeCalledTimes(1);
    expect(useRouter().push).toBeCalledWith({
      pathname: '/',
      query: {},
    });
  });
});
