import path from 'path';
import { Configuration } from "webpack";
import VirtualModulesPlugin from "webpack-virtual-modules";
import { generateAppCode } from "./getAppCode";
import { GenerateMode } from "./handleGenerateAsync";
import nodeExternals from "webpack-node-externals";
import { parseAppRoutes } from './parseAppRoutes';
import chalk from 'chalk';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import fs from 'fs';

export const generateWebackConfig = (pathList: string[], mode: GenerateMode, outputPath: string) => {
  // parse routes
  const routes = parseAppRoutes(pathList);
  console.log(chalk.green(`Parsed ${routes.length} routes`));
  routes.forEach(route => {
    console.log(`route: ${chalk.green(route.routeUrl)} \t -> file: ${chalk.green(route.importPath)} `);
  });
  // create virtual-modules
  const appCode = generateAppCode(routes);
  const virtualModules = new VirtualModulesPlugin({
    './.virtual/index.js': appCode.index,
    './.virtual/project-routes.js': appCode.routes
  });

  // run webpack
  const config: Configuration = {
    entry: './.virtual/index.js',
    mode,
    target: "node",
    externalsPresets: { node: true },
    externals: [nodeExternals({
      allowlist: (modulePath) => {
        return !([
          "webpack",
          "webpack-virtual-modules",
          "webpack-node-externals",
          "carpincho"
        ].includes(modulePath));
      }
    })],
    output: {
      path: path.resolve('./dist'),
      filename: 'index.js',
      globalObject: "this"
    },
    module: {
      rules: [{
        test: /\.(jsx?)|(tsx?)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "swc-loader",
            options: { jsc: { target: "es2015", parser: { syntax: "typescript" } } }
          },
        ]
      }],
    },
    plugins: [
      virtualModules,
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        cleanOnceBeforeBuildPatterns: [path.resolve("./dist")],
      }),
    ]
  };

  const hasTsConfig = (fs.existsSync('tsconfig.json'));
  if(hasTsConfig) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
    if(fs.readFileSync('tsconfig.json').toString() === '') {
      console.log(chalk.blue('tsconfig.json is empty, adding default config'));
      fs.writeFileSync('tsconfig.json', appCode.tsconfig)
    }
  }
  return config;
}