import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';

const LS_ITEMS_PER_PAGE_NAME = 'TN_ItemsPerPage2';

export default function MainPage() {
  const [needThrowError, setNeedThrowError] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(+(localStorage.getItem(LS_ITEMS_PER_PAGE_NAME) ?? '20'));
  const [, setSearchParams] = useSearchParams();

  const onItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem(LS_ITEMS_PER_PAGE_NAME, event.target.value);
    setItemsPerPage(+event.target.value);
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
      <SearchBar />

      <label>
        <span>Items per page: </span>
        <select value={itemsPerPage} onChange={onItemsPerPageChange} className="px-2 mb-5 ml-2 border-2">
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
        </select>
      </label>

      <CardList itemsPerPage={itemsPerPage} />

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
