import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../../src/App';
import { store } from '../../src/store/store';

describe('Tests for the Pagination component', () => {
  it('Should updates URL query parameter when page changes', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    await waitForElementToBeRemoved(screen.queryByText('Loading...'));

    let btns = screen.queryAllByRole('button', { name: '2' });
    expect(btns).toHaveLength(2);
    fireEvent.click(btns[0]);
    expect(window.location.search).toContain('page=2');

    await waitForElementToBeRemoved(screen.queryByText('Loading...'));

    btns = screen.queryAllByRole('button', { name: '3' });
    expect(btns).toHaveLength(2);
    fireEvent.click(btns[0]);
    expect(window.location.search).toContain('page=3');
  });
});
