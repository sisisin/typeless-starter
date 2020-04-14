/* eslint-disable no-restricted-imports */
import { useRouteMatch } from 'react-router-dom';
import { appHistory } from 'app/services/appHistory';

export const useRouter = <T>() => {
  const history = appHistory;

  const location = history.location;
  const { params } = useRouteMatch<T>();

  return {
    params,
    history,
    location,
  };
};
