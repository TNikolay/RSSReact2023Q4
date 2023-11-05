import { NavLink } from 'react-router-dom';

const setActiveLink = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'text-black' : 'hover:opacity-70';
};

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full bg-orange-600">
      <div>
        <nav className="flex gap-10 items-center py-5 text-xl font-bold text-white">
          <NavLink to="/" className={setActiveLink}>
            Home
          </NavLink>
          <NavLink to="/about" className={setActiveLink}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
