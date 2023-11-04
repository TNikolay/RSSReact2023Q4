import { useState } from 'react';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';

const LS_QUERY_ITEM_NAME = 'TN_Query';
const LS_ITEMS_PER_PAGE_NAME = 'TN_ItemsPerPage';

export default function MainPage() {
  const [needThrowError, setNeedThrowError] = useState(false);
  const [query, setQuery] = useState(
    localStorage.getItem(LS_QUERY_ITEM_NAME) ?? ''
  );
  const [itemsPerPage, setItemPerPage] = useState(
    +(localStorage.getItem(LS_ITEMS_PER_PAGE_NAME) ?? '20')
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

  const onItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem(LS_ITEMS_PER_PAGE_NAME, e.target.value);
    setItemPerPage(+e.target.value);
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

      <label>
        <span>Items per page: </span>
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="px-2 mb-5 ml-2 border-2"
        >
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
          <option value="40">40 / page</option>
        </select>
      </label>

      <CardList query={query} itemsPerPage={itemsPerPage} />

      <button
        className="fixed right-10 bottom-10 z-50 px-4 py-2 text-2xl text-black bg-red-700 rounded-full hover:text-white"
        onClick={() => setNeedThrowError(true)}
      >
        Throw Error
      </button>

      {needThrowError && throwError()}
    </>
  );
}
