import { useContext } from 'react';
import { QueryContext } from '../contexts/QueryContext';
import { useSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const { query, setQuery } = useContext(QueryContext);
  const [, setSearchParams] = useSearchParams();

  const onSubmitClick = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const query = (data.get('searchQuery') as string).trim() || '';

    setQuery(query);
    setSearchParams((prev) => {
      prev.delete('page');
      return prev;
    });
  };

  return (
    <div className="flex justify-center mb-5">
      <form onSubmit={onSubmitClick}>
        <input
          type="search"
          name="searchQuery"
          className="px-4 py-2 border"
          placeholder="Search..."
          autoComplete="off"
          defaultValue={query}
        />

        <button type="submit" className="px-6 py-2 m-3 bg-green-500 rounded-full hover:text-white">
          Search
        </button>
      </form>
    </div>
  );
}
