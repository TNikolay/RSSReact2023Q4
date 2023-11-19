import { useSearchParams } from 'react-router-dom';
import { setQuery } from '../store/SearchSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

export default function SearchBar() {
  const { query } = useAppSelector((state) => state.searchReduces);
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  const onSubmitClick = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const query = (data.get('searchQuery') as string).trim() || '';

    dispatch(setQuery(query));
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
