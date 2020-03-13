import { SessionActions } from '../session/interface';
import { LoginActions } from './interface';
import { epic } from './module';
import { runEpic } from 'app/testHelpers/unitTest';

describe('epic', () => {
  it('exists epic', async () => {
    const results = await runEpic(epic, LoginActions.loginSubmitted());

    expect(results).toMatchObject([SessionActions.loginSucceeded({ name: '/login?user=hoge' })]);
  });
});
