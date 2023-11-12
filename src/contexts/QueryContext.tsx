import { PropsWithChildren, createContext, useState } from 'react';
import { LS_QUERY_ITEM_NAME } from '../constants';

interface IQueryContext {
  query?: string;
  setQuery: (query: string) => void;
}

const initialState: IQueryContext = {
  //query: localStorage.getItem(LS_QUERY_ITEM_NAME) ?? '', - this does not work with test!?!?
  query: undefined,
  setQuery: () => {},
};

export const QueryContext = createContext<IQueryContext>(initialState);

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState(
    initialState.query ? initialState.query : localStorage.getItem(LS_QUERY_ITEM_NAME) ?? ''
  );

  const setQuery = (query: string) => {
    localStorage.setItem(LS_QUERY_ITEM_NAME, query);
    setValue(query);
  };

  return <QueryContext.Provider value={{ query: value, setQuery }}>{children}</QueryContext.Provider>;
};
