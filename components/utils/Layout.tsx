import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="pt-5 mx-auto w-[90%] flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
