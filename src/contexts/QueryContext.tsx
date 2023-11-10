import { PropsWithChildren, createContext, useState } from 'react';

interface IQueryContext {
  query: string;
  setQuery: (query: string) => void;
}

const LS_QUERY_ITEM_NAME = 'TN_Query';

const initialState: IQueryContext = {
  query: localStorage.getItem(LS_QUERY_ITEM_NAME) ?? '',
  setQuery: () => {},
};

export const QueryContext = createContext<IQueryContext>(initialState);

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState(initialState.query);

  const setQuery = (query: string) => {
    localStorage.setItem(LS_QUERY_ITEM_NAME, query);
    setValue(query);
  };

  return <QueryContext.Provider value={{ query: value, setQuery }}>{children}</QueryContext.Provider>;
};
