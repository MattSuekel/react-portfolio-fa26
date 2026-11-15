import { useEffect } from 'react';
import { Outlet, useSubmit, useLoaderData } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { getTokenDuration } from '../utils/auth-utils';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) return;

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

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
