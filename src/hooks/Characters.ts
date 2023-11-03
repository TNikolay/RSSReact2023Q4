import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Character, Info } from '../Interfaces';

interface IQueryParams {
  page: number;
  name?: string;
}

export function useCharacters(query: string, page: number) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchProducts(name: string) {
      setError('');
      setLoading(true);
      const params: IQueryParams = { page };
      if (name) params.name = name;

      try {
        const response = await axios.get<Info<Character[]>>('character', {
          params,
        });

        setCharacters(response.data.results ?? []);
        setTotal(response.data.info?.count ?? 0);
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
    fetchProducts(query);
  }, [query, page]);

  return { characters, error, loading, total };
}
