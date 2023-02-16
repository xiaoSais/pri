import babelPluginProposalClassProperties from '@babel/plugin-proposal-class-properties';
import babelPluginProposalDecorators from '@babel/plugin-proposal-decorators';
import babelPluginProposalExportNamespace from '@babel/plugin-proposal-export-namespace-from';
import babelPluginProposalFunctionSent from '@babel/plugin-proposal-function-sent';
import babelPluginProposalJsonStrings from '@babel/plugin-proposal-json-strings';
import babelPluginProposalNumericSeparator from '@babel/plugin-proposal-numeric-separator';
import babelPluginProposalOptionalCatchBinding from '@babel/plugin-proposal-optional-catch-binding';
import babelPluginProposalThrowExpressions from '@babel/plugin-proposal-throw-expressions';
import babelPluginProposalOptionalChaining from '@babel/plugin-proposal-optional-chaining';
import babelPluginProposalNullishCoalescingOperator from '@babel/plugin-proposal-nullish-coalescing-operator';
import babelPluginSyntaxDynamicImport from '@babel/plugin-syntax-dynamic-import';
import babelPluginSyntaxImportMeta from '@babel/plugin-syntax-import-meta';
import transformRuntime from '@babel/plugin-transform-runtime';
import babelPresetEnv from '@babel/preset-env';
import babelPresetReact from '@babel/preset-react';
import babelPresetTypescript from '@babel/preset-typescript';
import * as babelPluginReactHotLoader from 'react-hot-loader/babel';
import * as _ from 'lodash';
import { babelPluginReactWrappedDisplayName } from './babel-plugin-react-wrapped-display-name';
import { globalState } from './global-state';

class DefaultOptions {
  modules: boolean | string = 'auto';

  plugins: any[][] = [];
}

export function getBabelOptions(options?: Partial<DefaultOptions>) {
  const mergedOptions = _.defaults(options || {}, new DefaultOptions());

  return {
    babelrc: false,
    comments: globalState.isDevelopment,
    presets: [
      [babelPresetEnv, { modules: mergedOptions.modules, loose: true }],
      [babelPresetReact],
      [babelPresetTypescript],
    ],
    plugins: [
      [transformRuntime],
      ...(globalState.isDevelopment ? [[babelPluginReactHotLoader]] : []),
      [babelPluginProposalDecorators, { legacy: true }],
      [babelPluginProposalExportNamespace],
      [babelPluginProposalFunctionSent],
      [babelPluginProposalNumericSeparator],
      [babelPluginProposalThrowExpressions],
      [babelPluginProposalOptionalChaining],
      [babelPluginReactWrappedDisplayName],
      [babelPluginProposalNullishCoalescingOperator],
      [babelPluginSyntaxDynamicImport],
      [babelPluginSyntaxImportMeta],
      [babelPluginProposalClassProperties, { loose: true }],
      [babelPluginProposalJsonStrings],
      [babelPluginProposalOptionalCatchBinding],
      ...mergedOptions.plugins,
    ],
  };
}
