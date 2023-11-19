import { useSearchParams } from 'react-router-dom';
import { IGetCharactersParams, useGetCharactersQuery } from '../store/CharactersApi';
import { useAppSelector } from '../store/store';
import Card from './Card';
import DetailedCard from './DetailedCard';
import Pagination from './Pagination';
import ErrorMessage from './utils/ErrorMessage';
import Loader from './utils/Loader';

export default function CardList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') as string) || 1;
  const details = parseInt(searchParams.get('details') as string) || 0;

  const { query, itemsPerPage, isLoadingList } = useAppSelector((state) => state.searchReduces);

  const params: IGetCharactersParams = { page, name: query, itemsPerPage };
  const { data, error } = useGetCharactersQuery(params);
  const characters = data?.characters ?? [];
  const total = data?.total ?? 0;

  const changePage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const changeDetailsId = (id: string) => {
    setSearchParams((prev) => {
      id ? prev.set('details', id) : prev.delete('details');
      return prev;
    });
  };

  return (
    <div className="flex">
      <div className="flex-grow w-[300px]">
        {error && (
          <ErrorMessage
            error={
              'status' in error
                ? error.status == 404
                  ? 'Sorry, there is no data for your requiest'
                  : `Error: ${error?.status}`
                : 'Unknow Error:('
            }
          />
        )}

        {isLoadingList && <Loader />}

        {!error && !isLoadingList && (
          <>
            <Pagination total={total} current={page} onClick={changePage} />

            <div className="flex flex-wrap gap-6 my-5">
              {characters.map((item) => (
                <Card data={item} key={item.id} onClick={() => changeDetailsId(item.id.toString())} />
              ))}
            </div>

            <Pagination total={total} current={page} onClick={changePage} />
          </>
        )}
      </div>

      {!!details && <DetailedCard id={details} onClose={() => changeDetailsId('')} />}
    </div>
  );
}
