import { useRouter } from 'next/router';
import { Character } from '../Interfaces';
import Card from './Card';
import DetailedCard from './DetailedCard';
import Pagination from './Pagination';
import ErrorMessage from './utils/ErrorMessage';

interface IProps {
  page: number;
  itemsPerPage: number;
  characterId: number;
  character: Character | null;
  characters: Character[];
  total: number;
}

export default function CardList({ page, itemsPerPage, characterId, character, characters, total }: IProps) {
  const router = useRouter();

  const changePage = (page: number) => {
    const query = { ...router.query };
    query.page = page.toString();
    router.push({ pathname: router.pathname, query });
  };

  const changeDetailsId = (id: string | undefined) => {
    const query = { ...router.query };
    query.id = id;
    router.push({ pathname: router.pathname, query });
  };

  return (
    <div className="flex">
      <div className="flex-grow w-[300px]">
        {!characters.length && <ErrorMessage error={'Sorry, there is no data for your requiest'} />}

        {!!characters.length && (
          <>
            <Pagination total={total} itemsPerPage={itemsPerPage} current={page} onClick={changePage} />

            <div className="flex flex-wrap gap-6 my-5">
              {characters.map((item) => (
                <Card data={item} key={item.id} onClick={() => changeDetailsId(item.id.toString())} />
              ))}
            </div>

            <Pagination total={total} itemsPerPage={itemsPerPage} current={page} onClick={changePage} />
          </>
        )}
      </div>

      {!!characterId && <DetailedCard character={character} onClose={() => changeDetailsId(undefined)} />}
    </div>
  );
}
