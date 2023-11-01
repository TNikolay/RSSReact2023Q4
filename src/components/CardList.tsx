import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Character, Info } from '../Interfaces';
import Card from './Card';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';

interface IProps {
  query: string;
}

export default function CardList({ query }: IProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchProducts(query);
  }, [query]);

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading && <Loader />}
      {!error && !loading && !characters.length && (
        <ErrorMessage error={'Sorry, there is no data for your requiest'} />
      )}

      <div className="flex flex-wrap gap-6">
        {characters.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
