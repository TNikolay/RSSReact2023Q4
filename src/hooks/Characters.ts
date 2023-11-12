import axios, { AxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { Character, Info } from '../Interfaces';
import { API_ITEMS_PER_PAGE } from '../constants';
import { CharactersContext } from '../contexts/CharactersContext';
import { QueryContext } from '../contexts/QueryContext';

interface IQueryParams {
  page: number;
  name?: string;
}

const calcCurPage = (page: number, itemsPerPage: number) => {
  if (page === 1 || itemsPerPage === 20) return page;
  if (itemsPerPage === 10) return Math.ceil((page * itemsPerPage) / API_ITEMS_PER_PAGE);
  return ((page - 1) * itemsPerPage) / API_ITEMS_PER_PAGE + 1;
};

export function useCharacters(page: number, itemsPerPage: number) {
  const { query } = useContext(QueryContext);
  const { characters, loading, error, total, startLoading, setResponseData, setErrorData } =
    useContext(CharactersContext);

  useEffect(() => {
    async function fetchData() {
      startLoading();

      const params: IQueryParams = { page: calcCurPage(page, itemsPerPage) };
      if (query) params.name = query;

      try {
        const response = await axios.get<Info<Character[]>>('character', {
          params,
        });

        if (!response.data.results) setResponseData([], 0);
        else {
          const res = response.data.results;
          const total = response.data.info?.count ?? 0;

          switch (itemsPerPage) {
            case 10:
              setResponseData(page % 2 ? res.slice(0, 10) : res.slice(10), total);
              break;
            case 20:
              setResponseData(res, total);
              break;
            case 40:
              if (response.data.info?.next) {
                params.page++;
                const response2 = await axios.get<Info<Character[]>>('character', { params });
                setResponseData(res.concat(response2.data?.results ?? []), total);
              } else setResponseData(res, total);
              break;
            default:
              setResponseData(res, total);
              console.error('WTF??? itemsPerPage = ', itemsPerPage);
          }
        }
      } catch (e: unknown) {
        const error = e as AxiosError;

        if (error.response?.status === 404) {
          setResponseData([], 0);
          return;
        }

        setErrorData(error.message);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, itemsPerPage]);

  return { characters, error, loading, total };
}
