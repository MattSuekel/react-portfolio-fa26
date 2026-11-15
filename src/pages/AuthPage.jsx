import {
  Form,
  Link,
  redirect,
  useActionData,
  useSearchParams,
  useNavigation,
} from 'react-router-dom';

const API_KEY = 'AIzaSyCAjxMCXox8va7f332n9TdIVC6U_BQ92lo';

export default function AuthPage() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get('mode') !== 'signup';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="mx-auto max-w-sm py-30">
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">
          {isLogin ? 'Log in' : 'Create account'}
        </h1>

        {data?.error && (
          <p
            role="alert"
            className="border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 font-sans text-sm text-red-400"
          >
            {data.error}
          </p>
        )}

        <Form method="post" className="flex flex-col gap-4 font-sans">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="block text-sm text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="h-10 w-full border-b border-border bg-transparent px-0 text-sm 
              text-foreground placeholder:text-muted transition-colors focus:border-foreground focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="block text-sm text-muted">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="h-10 w-full border-b border-border bg-transparent px-0 text-sm 
              text-foreground placeholder:text-muted transition-colors focus:border-foreground focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full border border-border bg-surface px-4 py-2 text-sm font-medium 
            text-foreground transition-colors hover:border-foreground/50 hover:bg-white/5 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : isLogin ? 'Log in' : 'Sign up'}
          </button>
        </Form>

        <div className="pt-2 font-sans text-sm text-muted">
          {isLogin ? (
            <Link
              to="?mode=signup"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          ) : (
            <Link
              to="?mode=login"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Log in
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode =
    searchParams.get('mode') === 'signup' ? 'signUp' : 'signInWithPassword';

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    returnSecureToken: true,
  };

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    },
  );

  if (
    response.status === 401 ||
    response.status === 422 ||
    response.status === 500 ||
    response.status === 400
  ) {
    const errorData = await response.json();
    return {
      error: errorData.error?.message,
    };
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could no authenticate user.' }), {
      status: 500,
    });
  }

  const responseData = await response.json();
  const token = responseData.idToken;
  localStorage.setItem('token', token);

  const expiration = new Date();
  const expiresInSeconds = parseInt(responseData.expiresIn, 10) || 3600;
  expiration.setSeconds(expiration.getSeconds() + expiresInSeconds);

  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}
