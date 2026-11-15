import { Form, Link, useRouteLoaderData } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();
  const token = useRouteLoaderData('root');

  return (
    <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border py-4">
      <p className="font-sans text-sm text-muted">&copy; {year} Matthew Suekel</p>

      <div className="flex flex-row gap-4">
        {!token && (
          <Link
            to="/auth"
            className="font-sans text-sm text-muted hover:text-foreground"
          >
            log in
          </Link>
        )}

        {token && (
          <>
            <Link
              to="manage-projects"
              className="font-sans text-sm text-muted hover:text-foreground"
            >
              manage projects
            </Link>

            <Form
              action="/logout"
              method="post"
              className="font-sans text-sm text-muted hover:text-foreground"
            >
              <button type="submit">log out</button>
            </Form>
          </>
        )}
      </div>
    </footer>
  );
}

export default Footer;
