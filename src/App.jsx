import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import RootLayout from './pages/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'projects',
        children: [
          {
            index: true,
            element: <ProjectsPage />,
          },
          {
            path: ':projectId',
            id: 'project-detail',
            children: [
              {
                index: true,
                element: <ProjectDetailPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
