import { useLocation, matchPath } from 'react-router-dom';

export function useRoutes() {
  const location = useLocation();

  const currentRoute = () => {
    return ROUTES_ARR.find((route) =>
      matchPath(route.route, location.pathname)
    );
  };

  return {
    currentRoute
  };
};

const ROUTES_ARR = [
  {
    key: 'users',
    route: '/users'
  },
  {
    key: 'clients',
    route: '/clients'
  }
];
