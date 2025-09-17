import { useMemo } from "react";
import { useLocation, matchPath } from 'react-router-dom';

export function useRoutes() {
  const location = useLocation();

  const currentRoute = useMemo(() => {
    return ROUTES_ARR.find((route) =>
      matchPath(route.route, location.pathname),
    );
  }, [location.pathname]);

  return {
    currentRoute,
  };
};

const ROUTES_ARR = [
  {
    key: 'users',
    route: '/users',
  },
  {
    key: 'clients',
    route: '/clients',
  },
];
