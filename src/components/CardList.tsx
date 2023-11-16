import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryContext } from '../contexts/QueryContext';
import { IGetCharactersParams, useGetCharactersQuery } from '../store/CharactersApi';
import Card from './Card';
import DetailedCard from './DetailedCard';
import Pagination from './Pagination';
import ErrorMessage from './utils/ErrorMessage';
import Loader from './utils/Loader';

interface IProps {
  readonly itemsPerPage: number;
}

export default function CardList({ itemsPerPage }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') as string) || 1;
  const details = parseInt(searchParams.get('details') as string) || 0;

  const { query: name } = useContext(QueryContext);

  const params: IGetCharactersParams = { page, name, itemsPerPage };
  const { data, error, isLoading } = useGetCharactersQuery(params);
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
              error.status == 404
                ? 'Sorry, there is no data for your requiest'
                : `Error: ${error?.data?.error} (${error?.status})`
            }
          />
        )}

        {isLoading && <Loader />}

        {!error && !isLoading && (
          <>
            {total > itemsPerPage && (
              <Pagination total={Math.ceil(total / itemsPerPage)} current={page} onClick={changePage} />
            )}

            <div className="flex flex-wrap gap-6">
              {characters.map((item) => (
                <Card data={item} key={item.id} onClick={() => changeDetailsId(item.id.toString())} />
              ))}
            </div>

            {total > itemsPerPage && (
              <Pagination total={Math.ceil(total / itemsPerPage)} current={page} onClick={changePage} />
            )}
          </>
        )}
      </div>

      {!!details && <DetailedCard id={details} onClose={() => changeDetailsId('')} />}
    </div>
  );
}
