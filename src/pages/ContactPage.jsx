import { Form, useActionData, useNavigation } from 'react-router-dom';

function ContactPage() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="mx-auto max-w-lg space-y-6 py-12">
      <div className="space-y-4 pb-6">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Contact
        </h1>
      </div>

      {data?.message && !isSubmitting && (
        <p
          role={data.ok ? 'status' : 'alert'}
          className="font-sans text-sm text-muted"
        >
          {data.message}
        </p>
      )}

      {!data?.ok && (
        <Form method="post" className="flex flex-col gap-5 font-sans">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="block text-sm text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="h-10 w-full border-b border-border bg-transparent px-0 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none"
            />
          </div>

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
              className="h-10 w-full border-b border-border bg-transparent px-0 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="block text-sm text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full resize-y border-b border-border bg-transparent py-2 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/50 hover:bg-white/5 disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
        </Form>
      )}
    </div>
  );
}

export default ContactPage;

export async function action({ request }) {
  const data = await request.formData();
  const messageData = {
    name: data.get('name')?.trim(),
    email: data.get('email')?.trim(),
    message: data.get('message')?.trim(),
  };

  if (!messageData.name || !messageData.email || !messageData.message) {
    return { message: 'Please fill in all fields.' };
  }

  try {
    const response = await fetch(
      'https://react-db-2fda0-default-rtdb.firebaseio.com/portfolio/messages.json',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      },
    );

    if (!response.ok) {
      throw new Error('Could not send message.');
    }

    return {
      ok: true,
      message: 'Thanks for reaching out! I will get back to you shortly',
    };
  } catch {
    return { message: 'could not send your message :( please try again.' };
  }
}
