import { PropsWithChildren, createContext, useState } from 'react';
import { Character } from '../Interfaces';

interface ICharactersContext {
  characters: Character[];
  loading: boolean;
  error: string;
  total: number;
  startLoading: () => void;
  setResponseData: (characters: Character[], total: number) => void;
  setErrorData: (error: string) => void;
}

const initialState: ICharactersContext = {
  characters: [],
  loading: false,
  error: '',
  total: 0,
  startLoading: () => {},
  setResponseData: () => {},
  setErrorData: () => {},
};

export const CharactersContext = createContext<ICharactersContext>(initialState);

export const CharactersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>(initialState.characters);
  const [loading, setLoading] = useState(initialState.loading);
  const [error, setError] = useState(initialState.error);
  const [total, setTotal] = useState(initialState.total);

  const startLoading = () => {
    setError('');
    setLoading(true);
  };

  const setResponseData = (characters: Character[], total: number) => {
    setCharacters(characters);
    setTotal(total);
    setLoading(false);
  };

  const setErrorData = (error: string) => {
    setError(error);
    setLoading(false);
  };

  return (
    <CharactersContext.Provider
      value={{ characters, loading, error, total, startLoading, setResponseData, setErrorData }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
