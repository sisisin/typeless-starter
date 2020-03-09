import { createBrowserHistory, History, LocationState } from 'history';

class AppHistory {
  constructor(private history: History<LocationState>) {}

  push(path: History.Path) {
    this.history.push(path);
  }

  toRouterProps() {
    return { history: this.history };
  }
}

export const appHistory = new AppHistory(createBrowserHistory());
