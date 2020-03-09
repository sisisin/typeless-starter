import { Registry, ActionLike } from 'typeless';

export class AppRegistry extends Registry {
  dispatch(action: ActionLike) {
    // some middleware implementation

    super.dispatch(action);
  }
}
