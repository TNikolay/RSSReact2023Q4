import { useRouter } from 'next/router';

interface IProps {
  name: string;
}

export default function SearchBar({ name }: IProps) {
  const router = useRouter();

  const onSubmitClick = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const name = (data.get('searchQuery') as string).trim() || '';

    const query = { ...router.query };
    query.name = name;
    query.page = '1';
    router.push({ pathname: router.pathname, query });
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
          defaultValue={name}
        />

        <button type="submit" className="px-6 py-2 m-3 bg-green-500 rounded-full hover:text-white">
          Search
        </button>
      </form>
    </div>
  );
}
