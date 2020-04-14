const path = require('path');
const { execSync } = require('child_process');
module.exports = function generate(plop) {
  plop.setActionType('addRoute', async (answers, config, plop) => {
    const route = plop.renderString('/{{snakeCase name}}', answers);
    const moduleName = plop.renderString('{{pascalCase name}}Module', answers);
    const options = `-r ${route} -p ${answers.name} -t ${answers.name} -m ${moduleName}`;

    const cmd = `ts-node -P ./scripts/tsconfig.json ./scripts/routesGenerator.ts ${options}`;
    execSync(cmd);
  });
  plop.setGenerator('feature', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose feature name in camelCase (e.g. myFeature)',
        basePath: '.',
      },
    ],
    actions: () => {
      const appTestPath = path.join(__dirname, 'src/app/App.test.tsx');
      return [
        {
          type: 'addMany',
          destination: path.join(__dirname, 'src/app/features'),
          base: '.blueprints/feature',
          templateFiles: '.blueprints/feature/**/**',
        },
        { type: 'addRoute' },
        {
          type: 'modify',
          path: appTestPath,
          pattern: /^/,
          template: `import { {{pascalCase name}}Module } from 'app/features/{{name}}/module';
`,
        },
        {
          type: 'modify',
          path: appTestPath,
          pattern: /$/g,
          template: `
it('renders {{name}} with /', async () => {
  const node = render(<App></App>, { withAuth: true });
  await navigateAndWaitForRendered('/{{snakeCase name}}', {});
  expect(node).toRenderComponent({{pascalCase name}}Module);
});
`,
        },
      ];
    },
  });
  plop.setGenerator('module', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose module name in camelCase (e.g. myModule)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'src/app/features'),
        base: '.blueprints/module',
        templateFiles: '.blueprints/module/**/**',
      },
    ],
  });
};
