import { useState } from 'react';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';

const LS_QUERY_ITEM_NAME = 'TN_Query';

export default function MainPage() {
  const [needThrowError, setNeedThrowError] = useState(false);
  const [query, setQuery] = useState(
    localStorage.getItem(LS_QUERY_ITEM_NAME) ?? ''
  );
  const [, setSearchParams] = useSearchParams();

  const onSearchSubmit = (query: string) => {
    localStorage.setItem(LS_QUERY_ITEM_NAME, query);
    setQuery(query);
    setSearchParams((prev) => {
      prev.delete('page');
      return prev;
    });
  };

  const throwError = () => {
    throw new Error('Test error');
  };

  return (
    <>
      <h1>Here search can you</h1>
      <SearchBar initQuery={query} onSubmit={onSearchSubmit} />
      <CardList query={query} />

      {needThrowError && throwError()}
      <button
        className="fixed right-10 bottom-10 px-4 py-2 text-2xl text-black bg-red-700 rounded-full hover:text-white"
        onClick={() => setNeedThrowError(true)}
      >
        Throw Error
      </button>
    </>
  );
}
