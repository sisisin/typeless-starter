/* eslint-disable no-restricted-imports */
import { appHistory } from 'app/services/appHistory';
import { useLocation, useRouteMatch } from 'react-router-dom';

export const useRouter = <T>() => {
  const history = appHistory;
  const { state: _, ...location } = useLocation();
  const { params } = useRouteMatch<T>();

  return {
    params,
    history,
    location,
  };
};
