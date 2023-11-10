import { PropsWithChildren, createContext, useState } from 'react';

interface IQueryContext {
  query: string;
  setQuery: (query: string) => void;
}

const initialState: IQueryContext = {
  query: '',
  setQuery: () => {},
};

const LS_QUERY_ITEM_NAME = 'TN_Query';

export const QueryContext = createContext<IQueryContext>(initialState);

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState(localStorage.getItem(LS_QUERY_ITEM_NAME) ?? '');

  const setQuery = (query: string) => {
    localStorage.setItem(LS_QUERY_ITEM_NAME, query);
    setValue(query);
  };

  return <QueryContext.Provider value={{ query: value, setQuery }}>{children}</QueryContext.Provider>;
};
