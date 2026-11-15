import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthPage, { action as authAction } from './pages/AuthPage';
import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';
import HomePage, { loader as homeProjectsLoader } from './pages/HomePage';
import { action as logoutAction } from './pages/logout';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import RootLayout from './pages/RootLayout';
import { tokenLoader } from './utils/auth-utils';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage />, loader: homeProjectsLoader },
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
      {
        path: 'auth',
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
