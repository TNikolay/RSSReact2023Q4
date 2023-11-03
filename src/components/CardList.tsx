import { useCharacters } from '../hooks/Characters';
import Card from './Card';
import Loader from './utils/Loader';
import ErrorMessage from './utils/ErrorMessage';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';

interface IProps {
  readonly query: string;
}

const ITEM_PER_PAGE = 20;

export default function CardList({ query }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') as string) || 1;

  const changePage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };
  const { loading, error, characters, total } = useCharacters(query, page);

  return (
    <>
      <p>
        query - {query}, page = {page}, total = {total}
      </p>
      {error && <ErrorMessage error={error} />}
      {loading && <Loader />}
      {!error && !loading && !characters.length && (
        <ErrorMessage error={'Sorry, there is no data for your requiest'} />
      )}

      {total > ITEM_PER_PAGE && (
        <Pagination
          total={Math.ceil(total / ITEM_PER_PAGE)}
          current={page}
          onClick={changePage}
        />
      )}

      <div className="flex flex-wrap gap-6">
        {characters.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>

      {total > ITEM_PER_PAGE && (
        <Pagination
          total={Math.ceil(total / ITEM_PER_PAGE)}
          current={page}
          onClick={changePage}
        />
      )}
    </>
  );
}
