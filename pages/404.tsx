import Link from 'next/link';

export default function NotfoundPage() {
  return (
    <div className="flex flex-col items-center">
      <h1>Oops! Something went wrong. You should not be here:(</h1>;
      <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go back to home
      </Link>
    </div>
  );
}
