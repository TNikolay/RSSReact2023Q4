import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full bg-orange-600">
      <div>
        <nav className="flex gap-10 items-center py-5 text-xl font-bold text-white">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
