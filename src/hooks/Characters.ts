import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Character, Info } from '../Interfaces';

export function useCharacters(query: string) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchProducts(name: string) {
    setError('');
    setLoading(true);
    try {
      const response = await axios.get<Info<Character[]>>(
        'character' + (name ? `?name=${name}` : '')
      );

      setCharacters(response.data.results ?? []);
    } catch (e: unknown) {
      const error = e as AxiosError;

      if (error.response?.status === 404) {
        setCharacters([]);
        return;
      }

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(query);
  }, [query]);

  return { characters, error, loading };
}
