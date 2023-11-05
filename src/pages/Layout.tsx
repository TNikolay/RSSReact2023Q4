import { Outlet } from 'react-router-dom';
import Footer from '../components/utils/Footer';
import Header from '../components/utils/Header';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="pt-5 mx-auto w-[90%] flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
