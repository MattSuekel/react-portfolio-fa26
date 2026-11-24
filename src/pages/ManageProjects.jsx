import { useEffect, useRef, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';

import { getAuthToken } from '../utils/auth-utils';

const FIREBASE_DB_URL = 'https://react-db-2fda0-default-rtdb.firebaseio.com';

export default function ManageProjects() {
  const projects = useLoaderData();
  const fetcher = useFetcher();
  const formRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const editingProject = projects.find((project) => project.id === editingId);

  const isSubmitting = fetcher.state !== 'idle';

  useEffect(() => {
    if (
      fetcher.state === 'idle' &&
      fetcher.data?.ok &&
      fetcher.data.operation === 'create'
    ) {
      formRef.current?.reset();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <div className="mx-auto max-w-2xl space-y-16 py-12">
      <section className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">Manage Projects</h1>
        </div>

        {fetcher.data?.message && !isSubmitting && (
          <p
            role={fetcher.data.ok ? 'status' : 'alert'}
            className={`border px-3.5 py-2.5 font-sans text-sm ${
              fetcher.data.ok
                ? 'border-border bg-surface text-foreground'
                : 'border-red-500/30 bg-red-500/10 text-red-400'
            }`}
          >
            {fetcher.data.message}
          </p>
        )}

        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">
            {editingProject ? 'Edit Project' : 'Add Project'}
          </h2>
          {editingProject && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setEditingId(null)}
              className="font-sans text-sm text-muted hover:text-foreground disabled:opacity-50"
            >
              Cancel editing
            </button>
          )}
        </div>

        <fetcher.Form
          key={editingProject?.id || 'new'}
          ref={formRef}
          method={editingProject ? 'patch' : 'post'}
          className="flex flex-col gap-5 font-sans"
        >
          {editingProject && (
            <input type="hidden" name="projectId" value={editingProject.id} />
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="title" className="block text-sm text-muted">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={editingProject?.title || ''}
                required
                placeholder="project name"
                className="h-10 w-full border-b border-border bg-transparent px-0 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-foreground focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="year" className="block text-sm text-muted">
                Year
              </label>
              <input
                id="year"
                name="year"
                type="number"
                defaultValue={editingProject?.year || ''}
                required
                placeholder="year"
                className="h-10 w-full border-b border-border bg-transparent px-0 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="image" className="block text-sm text-muted">
                Cover Image
              </label>
              <input
                id="image"
                name="image"
                type="text"
                defaultValue={editingProject?.image || ''}
                required
                placeholder="image url"
                className="h-10 w-full border-b border-border bg-transparent px-0 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-foreground focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="type" className="block text-sm text-muted">
                Type
              </label>
              <input
                id="type"
                name="type"
                type="text"
                defaultValue={editingProject?.type || ''}
                required
                placeholder="personal"
                className="h-10 w-full border-b border-border bg-transparent px-0 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="block text-sm text-muted">
              Short Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              defaultValue={editingProject?.description || ''}
              required
              placeholder="a short description"
              className="h-10 w-full border-b border-border bg-transparent px-0 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-foreground focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="details" className="block text-sm text-muted">
              Details
            </label>
            <textarea
              id="details"
              name="details"
              rows={5}
              defaultValue={editingProject?.details || ''}
              required
              placeholder="full project details"
              className="w-full resize-y border-b border-border bg-transparent py-2 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-foreground focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="gallery" className="block text-sm text-muted">
              Gallery Images
            </label>
            <textarea
              id="gallery"
              name="gallery"
              rows={4}
              defaultValue={(editingProject?.gallery || []).join('\n')}
              aria-describedby="gallery-help"
              placeholder="/images/photo-1.jpg"
              className="w-full resize-y border-b border-border bg-transparent py-2 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-foreground focus:outline-none"
            />
            <p id="gallery-help" className="text-xs text-muted">
              image url per line
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-2.5 pt-1 text-sm text-muted select-none">
            <input
              type="checkbox"
              name="home"
              defaultChecked={editingProject?.home || false}
              className="h-4 w-4 accent-foreground"
            />
            Feature on Home Page
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/50 hover:bg-white/5 disabled:opacity-50"
          >
            {isSubmitting
              ? 'Saving...'
              : editingProject
                ? 'Save Changes'
                : 'Add Project'}
          </button>
        </fetcher.Form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Projects</h2>

        {projects && projects.length > 0 ? (
          <ul className="divide-y divide-border border-t border-b border-border font-sans">
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between gap-4 py-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {project.title}
                  </p>
                  <p className="text-xs text-muted">
                    {project.type} · {project.year}
                    {project.home ? ' · Featured' : ''}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setEditingId(project.id);
                      formRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }}
                    className="text-xs text-muted transition-colors hover:text-foreground disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <fetcher.Form
                    method="delete"
                    className="flex items-center"
                    onSubmit={(event) => {
                      if (
                        !window.confirm(
                          `Delete "${project.title}"? This cannot be undone.`,
                        )
                      ) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="projectId" value={project.id} />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-xs text-muted transition-colors hover:text-red-400 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </fetcher.Form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-sans text-sm text-muted">No projects found.</p>
        )}
      </section>
    </div>
  );
}

export async function loader() {
  const response = await fetch(`${FIREBASE_DB_URL}/portfolio/projects.json`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'could not get projects' }), {
      status: 500,
    });
  }

  const responseData = await response.json();
  const loadedProjects = [];

  for (const key in responseData) {
    loadedProjects.push({
      id: key,
      ...responseData[key],
    });
  }

  return loadedProjects;
}

export async function action({ request }) {
  const token = getAuthToken();
  const data = await request.formData();
  const projectId = data.get('projectId');
  const isEditing = request.method === 'PATCH';

  if ((isEditing || request.method === 'DELETE') && !projectId) {
    return { message: 'Please select a project.' };
  }

  try {
    if (request.method === 'DELETE') {
      const response = await fetch(
        `${FIREBASE_DB_URL}/portfolio/projects/${projectId}.json?auth=${token}`,
        { method: 'DELETE' },
      );

      if (!response.ok) {
        return { message: 'failed to delete project.' };
      }

      return { ok: true, message: 'project deleted.', operation: 'delete' };
    }

    const projectData = {
      title: data.get('title'),
      description: data.get('description'),
      details: data.get('details'),
      year: data.get('year'),
      image: data.get('image'),
      type: data.get('type'),
      home: data.get('home') === 'on',
      gallery: (data.get('gallery') || '')
        .split('\n')
        .map((image) => image.trim())
        .filter(Boolean),
    };

    const path = isEditing
      ? `/portfolio/projects/${projectId}`
      : '/portfolio/projects';
    const response = await fetch(`${FIREBASE_DB_URL}${path}.json?auth=${token}`, {
      method: isEditing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      return {
        message: isEditing ? 'failed to update project.' : 'failed to add project.',
      };
    }

    return {
      ok: true,
      message: isEditing ? 'project updated.' : 'project added.',
      operation: isEditing ? 'update' : 'create',
    };
  } catch {
    return { message: 'Could not save changes. Please try again.' };
  }
}
