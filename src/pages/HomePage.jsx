import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import me from '../assets/mecrop.jpg';
import ProjectCard from '../components/ProjectCard';
import useHttp from '../hooks/useHttp';

function HomePage() {
  const [projects, setProjects] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest('http://localhost:3000/projects', {}, setProjects);
  }, [sendRequest]);

  const homeProjects = projects.filter((project) => project.home);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-7 lg:gap-20">
      <div className="min-w-0 space-y-20 lg:col-span-4">
        <section className="space-y-5">
          <h1 className="text-2xl font-semibold text-foreground">Bio</h1>

          <p className="text-foreground">
            This is the first paragraph about me but idk what to say yet.
          </p>

          <p className="text-foreground">This is the second paragraph about me.</p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Projects</h2>

            <Link
              to="projects"
              className="font-sans text-sm text-muted hover:text-foreground"
            >
              View all
            </Link>
          </div>

          {isLoading && <p role="status">Loading projects...</p>}

          {error && <p role="alert">{error}</p>}

          {!isLoading && !error && (
            <div className="columns-1 gap-5 sm:columns-2">
              {homeProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>
      </div>

      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-8">
          <img
            src={me}
            alt="A picture of matthew suekel"
            className="h-picture w-full rounded-xl object-cover"
          />
        </div>
      </aside>
    </div>
  );
}

export default HomePage;
