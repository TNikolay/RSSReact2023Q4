import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import SearchBar from '../../src/components/SearchBar';
import { LS_QUERY_ITEM_NAME } from '../../src/constants';
import { QueryProvider } from '../../src/contexts/QueryContext';

describe('Tests for the Search component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const testQuery = 'test query';

    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryProvider>
          <SearchBar />
        </QueryProvider>
      </MemoryRouter>
    );

    expect(localStorage.getItem(LS_QUERY_ITEM_NAME) ?? '').toEqual('');

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: testQuery } });

    const btn = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(btn);

    expect(localStorage.getItem(LS_QUERY_ITEM_NAME)).toEqual(testQuery);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    const testQuery = 'test query read';
    localStorage.setItem(LS_QUERY_ITEM_NAME, testQuery);

    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryProvider>
          <SearchBar />
        </QueryProvider>
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue(testQuery)).toBeInTheDocument();
  });
});
