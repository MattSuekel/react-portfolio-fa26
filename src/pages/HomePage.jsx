import { Link } from 'react-router-dom';

import me from '../assets/mecrop.jpg';

function HomePage() {
  return (
    <div>
      <div>
        <section>
          <h2>Bio</h2>
          <p>this is the first paragaph about me but idk what to say yet</p>
          <p>this is the second paragaph about me</p>
        </section>
        <section>
          <div>
            <h2>Projects</h2>
            <Link to="projects">View all</Link>
          </div>
          <div>{/* todo: add project card component */}</div>
        </section>
      </div>
      <aside>
        <img src={me} alt="a picture of matthew suekel" />
      </aside>
    </div>
  );
}

export default HomePage;
