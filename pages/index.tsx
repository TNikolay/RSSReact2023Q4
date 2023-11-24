import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Character } from '../Interfaces';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { IGetCharactersParams, getCharacter, getCharacters } from '../lib/store/CharactersApi';
import { wrapper } from '../lib/store/store';

interface IPageProps {
  name: string;
  page: number;
  itemsPerPage: number;
  characterId: number;
  character: Character | null;
  characters: Character[];
  total: number;
}

export default function Home({ name, page, itemsPerPage, characterId, character, characters, total }: IPageProps) {
  const [needThrowError, setNeedThrowError] = useState(false);
  const router = useRouter();

  const onItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const query = { ...router.query };
    query.itemsPerPage = event.target.value;
    query.page = '1';
    router.push({ pathname: router.pathname, query });
  };

  const throwError = () => {
    throw new Error('Test error');
  };

  return (
    <>
      <Head>
        <title>Rick and Monty</title>
        <meta
          name="description"
          content="Find your favorite hero from Rick and Monty. Free, without registration and sms!"
        />
      </Head>

      <h1>Here search can you</h1>
      <SearchBar name={name} />

      <label>
        <span>Items per page: </span>
        <select value={itemsPerPage} onChange={onItemsPerPageChange} className="px-2 mb-5 ml-2 border-2">
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
        </select>
      </label>

      <CardList
        page={page}
        itemsPerPage={itemsPerPage}
        characterId={characterId}
        character={character}
        characters={characters}
        total={total}
      />

      <button
        className="fixed right-20 bottom-20 z-50 px-4 py-2 text-2xl text-black bg-red-700 rounded-full hover:text-white"
        onClick={() => setNeedThrowError(true)}
      >
        Throw Error
      </button>

      {needThrowError && throwError()}
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
  const page = typeof query.page === 'string' ? +query.page : 1;
  const name = typeof query.name === 'string' ? query.name : '';
  const characterId = typeof query.id === 'string' ? +query.id : 0;
  const t = typeof query.itemsPerPage === 'string' ? +query.itemsPerPage : 20;
  const itemsPerPage = t === 10 || t === 20 ? t : 20;

  const params: IGetCharactersParams = { page, name, itemsPerPage };
  const responseCharacters = await store.dispatch(getCharacters.initiate(params));
  const characters = responseCharacters.isSuccess ? responseCharacters.data.characters : [];
  const total = responseCharacters.isSuccess ? responseCharacters.data.total : 0;

  const responseCharacter = characterId > 0 ? await store.dispatch(getCharacter.initiate(characterId)) : null;
  const character = responseCharacter?.isSuccess ? responseCharacter.data : null;

  return { props: { name, page, itemsPerPage, characterId, character, characters, total } };
});
