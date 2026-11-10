import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

function RootLayout() {
  return (
    <div className="mx-auto flex min-h-screen flex-col max-w-7xl px-6 py-8">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
