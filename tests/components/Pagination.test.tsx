import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CardList from '../../components/CardList';
import { mockCharactersData } from '../../mocks/handlers/Characters';
import { useRouter } from 'next/router';

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

describe('Tests for the Pagination component', () => {
  it('Should updates URL query parameter when page changes', async () => {
    render(
      <CardList
        page={1}
        itemsPerPage={10}
        characterId={1}
        character={null}
        characters={mockCharactersData.results!}
        total={mockCharactersData.results!.length}
      />
    );

    const btns = screen.queryAllByRole('button', { name: '2' });
    expect(btns).toHaveLength(2);
    fireEvent.click(btns[0]);

    expect(useRouter().push).toBeCalledTimes(1);
    expect(useRouter().push).toBeCalledWith({
      pathname: '/',
      query: { page: '2' },
    });
  });
});
