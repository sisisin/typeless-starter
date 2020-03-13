import { createBrowserHistory, History, LocationState } from 'history';

class AppHistory {
  constructor(private history: History<LocationState>) {}

  push(path: History.Path) {
    this.history.push(path);
  }

  toRouterProps() {
    return { history: this.history };
  }

  get location() {
    const { state, search, ...rest } = this.history.location;
    const searchParams = new URLSearchParams(search);
    const pathAfter = `${rest.pathname}?${searchParams.toString()}${rest.hash}`;
    return { ...rest, searchParams, pathAfter };
  }
}

export const appHistory = new AppHistory(createBrowserHistory());
