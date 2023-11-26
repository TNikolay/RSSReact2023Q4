import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { describe } from 'node:test';
import { expect, it, vi } from 'vitest';
import SearchBar from '../../components/SearchBar';

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

describe('Tests for the SearchBar component', () => {
  it('Validate that clicking on a card triggers fetch a new page with detailed information.', async () => {
    const testString = 'initial string';
    render(<SearchBar name={testString} />);
    expect(await screen.findByDisplayValue(testString)).toBeInTheDocument();
  });

  it('Validate that clicking on a card triggers fetch a new page with detailed information.', async () => {
    const testString = 'new string';
    render(<SearchBar name="" />);

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: testString } });
    const btn = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(btn);

    expect(useRouter().push).toBeCalledTimes(1);
    expect(useRouter().push).toBeCalledWith({
      pathname: '/',
      query: { page: '1', name: testString },
    });
  });
});
