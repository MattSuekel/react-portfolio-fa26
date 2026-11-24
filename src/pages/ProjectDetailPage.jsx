import { Link, useLoaderData } from 'react-router-dom';

export default function ProjectDetailPage() {
  const { project, nextProject } = useLoaderData();
  const gallery = project.gallery || [];

  return (
    <article className="flex flex-1 flex-col space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-start">
          <div className="max-w-xl space-y-3">
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {project.title}
            </h1>
            <p className="text-base leading-relaxed text-muted">
              {project.description}
            </p>
          </div>

          <dl className="flex shrink-0 gap-8 font-sans text-sm">
            <div className="space-y-1">
              <dt className="text-xs text-muted">Year</dt>
              <dd className="font-medium text-foreground">{project.year}</dd>
            </div>

            <div className="space-y-1">
              <dt className="text-xs text-muted">Type</dt>
              <dd className="font-medium text-foreground">{project.type}</dd>
            </div>
          </dl>
        </div>
      </div>

      {project.image && (
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <img
            src={project.image}
            alt={project.title}
            className="max-h-152 w-full object-cover"
          />
        </div>
      )}

      {project.details && (
        <section className="max-w-2xl space-y-3 pt-2">
          <h2 className="text-xl font-semibold text-foreground">
            About the project
          </h2>
          <p className="leading-relaxed whitespace-pre-line text-muted">
            {project.details}
          </p>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-foreground">Gallery</h2>
            <p className="font-sans text-xs text-muted">
              {gallery.length} {gallery.length === 1 ? 'image' : 'images'}
            </p>
          </div>

          <div className="columns-1 gap-5 sm:columns-2 md:columns-3">
            {gallery.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={`${project.title} — image ${index + 1}`}
                loading="lazy"
                className="mb-5 w-full break-inside-avoid rounded-lg"
              />
            ))}
          </div>
        </section>
      )}

      {nextProject && (
        <div className="mt-auto border-t border-border pt-8">
          <Link
            to={`/projects/${nextProject.id}`}
            className="group inline-block space-y-3"
          >
            <span className="block font-sans text-xs text-muted">Next project</span>
            <p className="text-xl font-medium text-foreground transition-colors group-hover:text-accent">
              {nextProject.title}
            </p>
          </Link>
        </div>
      )}
    </article>
  );
}

export async function loader({ params }) {
  const id = params.projectId;
  const response = await fetch(
    'https://react-db-2fda0-default-rtdb.firebaseio.com/portfolio/projects.json',
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'could not get project details' }),
      { status: 500 },
    );
  }

  const responseData = await response.json();
  const loadedProjects = [];

  for (const key in responseData) {
    loadedProjects.push({
      id: key,
      ...responseData[key],
    });
  }

  const currentIndex = loadedProjects.findIndex((p) => p.id === id);

  if (currentIndex === -1) {
    throw new Response(JSON.stringify({ message: 'project not found' }), {
      status: 404,
    });
  }

  const project = loadedProjects[currentIndex];
  const nextProject =
    loadedProjects.length > 1
      ? loadedProjects[(currentIndex + 1) % loadedProjects.length]
      : null;

  return {
    project,
    nextProject,
  };
}
