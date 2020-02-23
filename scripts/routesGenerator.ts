import path from 'path';
import { Project, TypeGuards } from 'ts-morph';
import * as commandpost from 'commandpost';
import { exec } from 'child_process';

function createProject() {
  return new Project({ tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json') });
}

const routesFilePath = path.join(process.cwd(), 'src/app/routes.tsx');

const root = commandpost
  .create<{ route: string; title: string; path: string }, { route: string }>('hoge')
  .option('-r, --route <name>', 'specify route path')
  .option('-t, --title <name>', 'specify title')
  .option('-p, --path <name>', 'specify target feature path')
  .action((opts, args) => {
    generateRoute(opts).then(() => {
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

export async function generateRoute({ route, title, path }: { route: string; title: string; path: string }) {
  const p = createProject();
  const file = p.getSourceFile(routesFilePath)!;
  const vd = file.getVariableDeclaration('routes')!;
  vd.forEachDescendant((node, traversal) => {
    if (TypeGuards.isObjectLiteralExpression(node)) {
      const a = `'/${route}': route({
    title: '${title}',
    getView: () => import('./features/${path}/module'),
  }),`;
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
