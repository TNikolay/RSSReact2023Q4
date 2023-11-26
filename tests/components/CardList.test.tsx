import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CardList from '../../components/CardList';
import { mockCharactersData } from '../../mocks/handlers/Characters';

describe('Card List Check that an appropriate message is displayed if no cards are present.', () => {
  it('should render - Sorry, there is no data for your requiest', async () => {
    render(<CardList page={1} itemsPerPage={20} characterId={0} character={null} characters={[]} total={0} />);

    expect(await screen.findByText('Sorry, there is no data for your requiest')).toBeInTheDocument();
    expect(screen.queryByTestId('CardListItem')).not.toBeInTheDocument();
  });
});

describe('Card List - Verify that the component renders the specified number of cards', () => {
  const len = mockCharactersData.results!.length;
  it(`should render ${len} cards`, async () => {
    render(
      <CardList
        page={1}
        itemsPerPage={20}
        characterId={0}
        character={null}
        characters={mockCharactersData.results!}
        total={len}
      />
    );

    expect(await screen.findAllByTestId('CardListItem')).toHaveLength(len);
  });
});
