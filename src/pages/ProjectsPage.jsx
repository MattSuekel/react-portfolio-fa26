import { useLoaderData } from 'react-router-dom';

import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const projects = useLoaderData();

  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b border-border pb-6">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Projects
        </h1>
        <p className="font-sans text-sm text-muted">
          A selection of some of my projects
        </p>
      </div>

      <div className="columns-1 gap-5 sm:columns-2 md:columns-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export async function loader() {
  const response = await fetch(
    'https://react-db-2fda0-default-rtdb.firebaseio.com/portfolio/projects.json',
  );

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'could not fetch projects' }), {
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
