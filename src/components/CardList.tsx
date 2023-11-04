import { useCharacters } from '../hooks/Characters';
import Card from './Card';
import Loader from './utils/Loader';
import ErrorMessage from './utils/ErrorMessage';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import DetailedCard from './DetailedCard';

interface IProps {
  readonly query: string;
  readonly itemsPerPage: number;
}

export const ITEMS_PER_PAGE = 20;

export default function CardList({ query, itemsPerPage }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') as string) || 1;
  const details = parseInt(searchParams.get('details') as string) || 0;

  const { loading, error, characters, total } = useCharacters(
    query,
    page,
    itemsPerPage
  );

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
    <>
      <div className="flex">
        <div className="flex-grow w-[300px]">
          {/* <p>query - {query}, page = {page}, total = {total}, details = {details}</p> */}
          {error && <ErrorMessage error={error} />}
          {loading && <Loader />}
          {!error && !loading && !characters.length && (
            <ErrorMessage error={'Sorry, there is no data for your requiest'} />
          )}

          {total > itemsPerPage && (
            <Pagination
              total={Math.ceil(total / itemsPerPage)}
              current={page}
              onClick={changePage}
            />
          )}

          <div className="flex flex-wrap gap-6">
            {characters.map((item) => (
              <Card
                data={item}
                key={item.id}
                onClick={() => changeDetailsId(item.id.toString())}
              />
            ))}
          </div>

          {total > itemsPerPage && (
            <Pagination
              total={Math.ceil(total / itemsPerPage)}
              current={page}
              onClick={changePage}
            />
          )}
        </div>

        {!!details && (
          <DetailedCard id={details} onClose={() => changeDetailsId('')} />
        )}
      </div>
    </>
  );
}
