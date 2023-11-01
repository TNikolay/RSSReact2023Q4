import { useCharacters } from '../hooks/Characters';
import Card from './Card';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';

interface IProps {
  query: string;
}

export default function CardList({ query }: IProps) {
  const { loading, error, characters } = useCharacters(query);

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading && <Loader />}
      {!error && !loading && !characters.length && (
        <ErrorMessage error={'Sorry, there is no data for your requiest'} />
      )}

      <div className="flex flex-wrap gap-6">
        {characters.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
