import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthPage, { action as authAction } from './pages/AuthPage';
import ContactPage, { action as contactAction } from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';
import HomePage, { loader as homeProjectsLoader } from './pages/HomePage';
import { action as logoutAction } from './pages/logout';
import ManageProjects, {
  action as manageProjectsAction,
  loader as manageProjectsLoader,
} from './pages/ManageProjects';
import ProjectDetailPage, {
  loader as projectDetailLoader,
} from './pages/ProjectDetailPage';
import ProjectsPage, { loader as projectsLoader } from './pages/ProjectsPage';
import RootLayout from './pages/RootLayout';
import { tokenLoader, checkAuthLoader } from './utils/auth-utils';

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
            loader: projectsLoader,
            element: <ProjectsPage />,
          },
          {
            path: ':projectId',
            id: 'project-detail',
            children: [
              {
                index: true,
                loader: projectDetailLoader,
                element: <ProjectDetailPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'contact',
        element: <ContactPage />,
        action: contactAction,
      },
      {
        path: 'manage-projects',
        element: <ManageProjects />,
        loader: async () => {
          const redirectResult = checkAuthLoader();
          if (redirectResult) return redirectResult;
          return manageProjectsLoader();
        },
        action: manageProjectsAction,
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
