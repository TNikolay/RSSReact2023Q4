import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, Info } from '../Interfaces';
import { API_BASE_URL, API_ITEMS_PER_PAGE } from '../constants';

export interface IGetCharactersParams {
  page: number;
  name?: string;
  itemsPerPage: number;
}

interface IGetCharactersReturn {
  characters: Character[];
  total: number;
}

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<IGetCharactersReturn, IGetCharactersParams>({
      query: (params) => {
        const realParams: Omit<IGetCharactersParams, 'itemsPerPage'> = {
          page:
            params.itemsPerPage === 10
              ? Math.ceil((params.page * params.itemsPerPage) / API_ITEMS_PER_PAGE)
              : params.page,
        };
        if (params.name) realParams.name = params.name;

        return { url: 'character', params: realParams };
      },
      transformResponse: (response: Info<Character[]>, _meta, arg): IGetCharactersReturn => {
        if (arg.itemsPerPage === 10 && response.results)
          return {
            characters: arg.page % 2 ? response.results.slice(0, 10) : response.results.slice(10),
            total: response.info?.count ?? 0,
          };

        return {
          characters: response.results ?? [],
          total: response.info?.count ?? 0,
        };
      },
    }),

    getCharacter: builder.query<Character, number>({
      query: (id) => ({ url: `character/${id}` }),
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = charactersApi;
