import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { setItemPerPage } from '../store/SearchSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

export default function MainPage() {
  const [needThrowError, setNeedThrowError] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const { itemsPerPage } = useAppSelector((state) => state.searchReduces);

  const dispatch = useAppDispatch();

  const onItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setItemPerPage(+event.target.value));
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

      <CardList />

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
