import { Link, NavLink } from 'react-router-dom';

function Header() {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="mb-16 flex flex-wrap items-center justify-between gap-6">
      <Link to="/" className="font-serif text-2xl font-semibold text-foreground">
        Matthew Suekel
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex flex-wrap items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `font-sans text-sm transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
