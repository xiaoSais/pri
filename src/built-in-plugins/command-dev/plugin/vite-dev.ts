import * as portfinder from 'portfinder';
import * as path from 'path';
import { InlineConfig } from 'vite';
import { runVite } from '../../../utils/vite';
import { globalState } from '../../../utils/global-state';
import { debugProjectPrepare } from './project-dev';
import { analyseProject } from '../../../utils/analyse-project';
import { createEntry } from '../../../utils/create-entry';
import { spinner } from '../../../utils/log';
import { tempJsEntryPath } from '../../../utils/structor-config';
import { pri } from '../../../node';

// serve
export async function debugProjectWithVite(options: any) {
  const freePort = pri.sourceConfig.devPort || (await portfinder.getPortPromise());
  const dashboardServerPort = await portfinder.getPortPromise({ port: freePort + 1 });
  const dashboardClientPort = await portfinder.getPortPromise({ port: freePort + 2 });

  debugProjectPrepare(dashboardClientPort);

  await pri.project.ensureProjectFiles();
  await pri.project.checkProjectFiles();

  const analyseInfo = await spinner('Analyse project', async () => {
    const scopeAnalyseInfo = await analyseProject();
    await createEntry();
    return scopeAnalyseInfo;
  });

  // webpack opts
  const opts = {
    mode: options?.mode ?? 'development',
    autoOpenBrowser: true,
    hot: pri.sourceConfig.hotReload,
    publicPath: globalState.sourceConfig.publicPath,
    entryPath: {
      [path.basename(pri.sourceConfig.outFileName, '.js')]: path.join(
        globalState.projectRootPath,
        path.format(tempJsEntryPath),
      ),
      ...pri.sourceConfig.entries,
    },
    outFileName: '[name].js',
    devServerPort: freePort,
    pipeViteConfig: (config: InlineConfig) => {
      return {
        ...config,
        server: {
          port: freePort,
          https: pri.sourceConfig.useHttps,
          open: true,
          host: pri.sourceConfig.host,
          ...config.server,
        },
      };
    },
    ...(pri.sourceConfig.useHtmlTemplate && {
      htmlTemplatePath: path.join(__dirname, '../../../../template-project.ejs'),
      htmlTemplateArgs: {
        dashboardServerPort,
      },
    }),
  } as any;
  await runVite(opts);
}
