import { render, screen } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import ErrorBoundary from '../../components/utils/ErrorBoundary';
import Layout from '../../components/utils/Layout';
import { makeStore } from '../../lib/store/store';
import { mockCharactersData } from '../../mocks/handlers/Characters';
import Home, { getServerSideProps } from '../../pages';

const mockData = mockCharactersData.results![0];

export const gsspCtx = (ctx?: Partial<GetServerSidePropsContext>): GetServerSidePropsContext => ({
  req: createRequest(),
  res: createResponse(),
  params: undefined,
  query: {},
  resolvedUrl: '',
  ...ctx,
});

describe('Tests for the Home Page', () => {
  it('Ensure that the Home Page display mock data', async () => {
    const res = await getServerSideProps(gsspCtx());

    render(
      <Provider store={makeStore()}>
        <ErrorBoundary>
          <Layout>
            <Home {...res.props} />
          </Layout>
        </ErrorBoundary>
      </Provider>
    );
    expect(screen.getByRole('heading', { name: mockData.name }));
    expect(screen.getByRole('img', { name: mockData.name }));
  });
});
