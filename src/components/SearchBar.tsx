import React, { useState } from 'react';

interface IProps {
  initQuery: string;
  onSubmit: (query: string) => void;
}

export default function SearchBar({ initQuery, onSubmit }: IProps) {
  const [query, setQuery] = useState(initQuery);

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSubmitClick = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(query.trim());
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={onSubmitClick}>
        <input
          type="search"
          className="px-4 py-2 border"
          placeholder="Search..."
          autoComplete="off"
          value={query}
          onChange={onQueryChange}
        />

        <button
          type="submit"
          className="px-6 py-2 m-3 bg-green-500 rounded-full hover:text-white"
        >
          Search
        </button>
      </form>
    </div>
  );
}
