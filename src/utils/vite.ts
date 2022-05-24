import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs-extra';
import react from '@vitejs/plugin-react';
import { createServer, InlineConfig } from 'vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { createHtmlPlugin } from 'vite-plugin-html';
import { plugin } from './plugins';
import { globalState } from './global-state';
import { tempJsEntryPath, tempPath } from './structor-config';
import { pri } from '../node';
import { getWebpackConfig, IOptions } from './webpack-config';

interface IExtraOptions {
  pipeConfig?: (config?: webpack.Configuration) => Promise<webpack.Configuration>;
  pipeViteConfig?: (config?: InlineConfig) => Promise<InlineConfig>;
}

// webpack config toVite
export const wp2toVite = async (opts: webpack.Configuration) => {
  const customAlias = opts.resolve.alias as any;
  const convertToAlias = Object.keys(customAlias).map((aliasKey: string) => {
    return {
      find: aliasKey,
      replacement: customAlias[aliasKey],
    };
  });

  const lessLoader = {
    loader: 'less-loader',
    options: plugin.buildConfigLessLoaderOptionsPipes.reduce((options, fn) => {
      return fn(options);
    }, {}),
  };

  const scssLoader = {
    loader: 'less-loader',
    options: plugin.buildConfigSassLoaderOptionsPipes.reduce((options, fn) => {
      return fn(options);
    }, {}),
  } as any;

  const viteConfig = {
    configFile: false,
    mode: opts.mode,
    root: path.join(globalState.projectRootPath, tempPath.dir),
    optimizeDeps: {
      entries: [path.join(globalState.projectRootPath, path.format(tempJsEntryPath))],
    },
    resolve: {
      alias: [
        ...convertToAlias,
        {
          find: /^~.+/,
          replacement: (val: string) => {
            return val.replace(/^~/, '');
          },
        },
        {
          find: 'pri/client',
          replacement: 'pri/src/client/index.ts',
        },
      ] as any,
    },
    css: {
      preprocessorOptions: {
        less: {
          ...lessLoader.options,
          javascriptEnabled: true,
        },
        scss: {
          ...scssLoader.options,
          additionalData: scssLoader?.options?.data,
        },
      },
    },
    plugins: [
      react({
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy'],
          },
          configFile: false,
        },
      }),
      viteCommonjs(),
      pri.sourceConfig.useHtmlTemplate &&
        createHtmlPlugin({
          minify: true,
          entry: path.join(globalState.projectRootPath, path.format(tempJsEntryPath)),
          template: fs.existsSync(path.join(pri.projectRootPath, '.temp', 'index.html'))
            ? 'index.html'
            : path.relative(
                path.join(globalState.projectRootPath, tempPath.dir),
                path.join(__dirname, '../../../../template-project.ejs'),
              ),
          inject: {
            data: {
              htmlWebpackPlugin: {
                options: {
                  title: globalState.sourceConfig.title || globalState.projectRootPath.split(path.sep).pop(),
                },
              },
            },
          },
        }),
    ],
    server: {
      hmr: globalState.sourceConfig.hotReload,
    },
  };

  return plugin.buildViteConfigPipes.reduce(async (newConfig, fn) => {
    return fn(await newConfig);
  }, Promise.resolve(viteConfig as InlineConfig));
};

export const runVite = async (opts: IOptions<IExtraOptions>): Promise<any> => {
  let webpackConfig = await getWebpackConfig(opts);

  if (opts.pipeConfig) {
    webpackConfig = await opts.pipeConfig(webpackConfig);
  }

  let viteConfig = await wp2toVite(webpackConfig);

  if (opts.pipeViteConfig) {
    viteConfig = await opts.pipeViteConfig(viteConfig);
  }

  const server = await createServer(viteConfig);
  await server.listen();
  server.printUrls();
};
