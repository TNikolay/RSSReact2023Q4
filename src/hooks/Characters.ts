import axios, { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Character, Info } from '../Interfaces';
import { ITEMS_PER_PAGE } from '../components/CardList';
import { QueryContext } from '../contexts/QueryContext';

interface IQueryParams {
  page: number;
  name?: string;
}

const calcCurPage = (page: number, itemsPerPage: number) => {
  if (page === 1 || itemsPerPage === 20) return page;
  if (itemsPerPage === 10) return Math.ceil((page * itemsPerPage) / ITEMS_PER_PAGE);
  return ((page - 1) * itemsPerPage) / ITEMS_PER_PAGE + 1;
};

export function useCharacters(page: number, itemsPerPage: number) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const { query } = useContext(QueryContext);

  useEffect(() => {
    async function fetchData() {
      setError('');
      setLoading(true);

      const params: IQueryParams = { page: calcCurPage(page, itemsPerPage) };
      if (query) params.name = query;

      try {
        const response = await axios.get<Info<Character[]>>('character', {
          params,
        });

        setTotal(response.data.info?.count ?? 0);

        if (!response.data.results) setCharacters([]);
        else {
          const res = response.data.results;

          switch (itemsPerPage) {
            case 10:
              setCharacters(page % 2 ? res.slice(0, 10) : res.slice(10));
              break;
            case 20:
              setCharacters(res);
              break;
            case 40:
              if (response.data.info?.next) {
                params.page++;
                const response2 = await axios.get<Info<Character[]>>('character', { params });
                setCharacters(res.concat(response2.data?.results ?? []));
              } else setCharacters(res);
              break;
            default:
              setCharacters(res);
              console.error('WTF??? itemsPerPage = ', itemsPerPage);
          }
        }
      } catch (e: unknown) {
        const error = e as AxiosError;

        if (error.response?.status === 404) {
          setCharacters([]);
          setTotal(0);
          return;
        }

        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, page, itemsPerPage]);

  return { characters, error, loading, total };
}
