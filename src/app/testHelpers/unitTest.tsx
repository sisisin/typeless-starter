import { appHistory } from 'app/services/appHistory';
import { routes, AppRoutePaths } from 'app/components/AppRoutes';
import { generatePath } from 'react-router-dom';

export async function navigateAndWaitRendered(
  path: AppRoutePaths,
  params?: { [paramName: string]: string | number | boolean | undefined },
) {
  appHistory.push(generatePath(path, params));
  await routes.find((r) => r.path === path)!.Component.load();
}
