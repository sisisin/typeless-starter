const path = require('path');
const { execSync } = require('child_process');
module.exports = function generate(plop) {
  plop.setActionType('addRoute', async (answers, config, plop) => {
    const route = plop.renderString('{{snakeCase name}}', answers);
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
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'src/app/features'),
        base: '.blueprints/feature',
        templateFiles: '.blueprints/feature/**/**',
      },
      {
        type: 'addRoute',
      },
    ],
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
