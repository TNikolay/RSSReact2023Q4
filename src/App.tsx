import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import Layout from './pages/Layout';
import MainPage from './pages/MainPage';
import NotfoundPage from './pages/NotfoundPage';
import ReactHookFormPage from './pages/ReactHookFormPage';
import UncontrolledFormPage from './pages/UncontrolledFormPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="react-hook-form" element={<ReactHookFormPage />} />
        <Route path="uncontrolled-form" element={<UncontrolledFormPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Route>
    </Routes>
  );
}
