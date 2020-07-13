import path from 'path';
import { exec } from 'child_process';
import { Project, TypeGuards } from 'ts-morph';
import * as commandpost from 'commandpost';

function createProject() {
  return new Project({ tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json') });
}

const routesFilePath = path.join(process.cwd(), 'src/app/types/AppRouteDefinitions.ts');

interface CmdOpts {
  route: string;
  title: string;
  path: string;
  module: string;
}

const root = commandpost
  .create<CmdOpts, { route: string }>('hoge')
  .option('-r, --route <name>', 'specify route path')
  .option('-t, --title <name>', 'specify title')
  .option('-p, --path <name>', 'specify target feature path')
  .option('-m --module <name>', 'specify module name')
  .action((opts, args) => {
    return generateRoute(opts).then(() => {
      exec(`yarn eslint ${routesFilePath} --fix`, (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
      });
    });
  });

commandpost.exec(root, process.argv).catch((err) => {
  if (err instanceof Error) {
    console.error(err.stack);
  } else {
    console.error(err);
  }
  process.exit(1);
});

export async function generateRoute({ route, title, path, module }: CmdOpts) {
  const p = createProject();
  const file = p.getSourceFile(routesFilePath)!;
  const vd = file.getVariableDeclaration('appRouteDefinitions')!;

  vd.forEachDescendant((node, traversal) => {
    if (TypeGuards.isObjectLiteralExpression(node)) {
      const a = `${title}: {
        path: '${route}',
        authGuardType: 'private',
        Component: loadable(() =>
        import('app/features/${path}/module').then((m) => ({ default: m.${module} })),
      ) as LoadableComponent<unknown>,
      }`;
      const replaced = node.getText().replace(
        /}$/,
        `${a}
}`,
      );
      node.replaceWithText(replaced);
      traversal.stop();
    }
  });
  await file.save();
}
