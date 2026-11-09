import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/">@mattsuekel</Link>

      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
