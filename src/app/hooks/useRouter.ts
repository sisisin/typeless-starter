import { appHistory } from 'app/services/appHistory';

export const useRouter = () => {
  const history = appHistory;
  const location = history.location;

  return {
    history,
    location,
  };
};
