import { Link, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  let title = 'Error';
  let message = 'An unexpected error occurred.';

  if (error.status === 500) {
    title = 'Server Error';
    message = 'Something went wrong while loading this page.';
  }

  if (error.status === 404) {
    title = 'Page Not Found';
    message = 'Unable to locate the requested page or resource.';
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <h1 className="text-4xl font-semibold">{title}</h1>

      <p className="text-muted">{message}</p>

      <Link
        to="/"
        className="inline-block font-sans text-sm underline underline-offset-4"
      >
        Return home
      </Link>
    </main>
  );
}

export default ErrorPage;
