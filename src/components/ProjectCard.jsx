import { Link } from 'react-router-dom';

function ProjectCard(props) {
  return (
    <article className="mb-8 break-inside-avoid">
      <Link to={`projects/${props.project.id}`} className="group block">
        <img
          src={props.project.image}
          alt=""
          loading="lazy"
          className="w-full rounded-lg object-cover transition-opacity group-hover:opacity-80"
        />

        <div className="mt-3 space-y-1">
          <h3 className="text-lg font-semibold text-foreground">
            {props.project.title}
          </h3>

          <p className="font-sans text-xs text-muted">
            {props.project.type} · {props.project.year}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
