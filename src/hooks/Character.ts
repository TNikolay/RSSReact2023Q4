import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Character } from '../Interfaces';

export function useCharacter(id: number) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setError('');
      setLoading(true);

      try {
        const response = await axios.get<Character>(`character/${id}`);
        setCharacter(response.data);
      } catch (e: unknown) {
        const error = e as AxiosError;
        setCharacter(null);
        setError(
          error.response?.status === 404
            ? 'Sorry, there is no data for this character'
            : error.message
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { character, error, loading };
}
