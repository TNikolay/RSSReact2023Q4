interface IProps {
  readonly initQuery: string;
  readonly onSubmit: (query: string) => void;
}

export default function SearchBar({ initQuery, onSubmit }: IProps) {
  const onSubmitClick = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const query = (data.get('searchQuery') as string) || '';
    onSubmit(query.trim());
  };

  return (
    <div className="flex justify-center mb-5">
      <form onSubmit={onSubmitClick}>
        <input
          type="search"
          name="searchQuery"
          className="px-4 py-2 border"
          placeholder="Search..."
          autoComplete="off"
          defaultValue={initQuery}
        />

        <button type="submit" className="px-6 py-2 m-3 bg-green-500 rounded-full hover:text-white">
          Search
        </button>
      </form>
    </div>
  );
}
