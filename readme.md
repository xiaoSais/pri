# Pri &middot; [![npm version](https://img.shields.io/npm/v/pri.svg?style=flat-square)](https://www.npmjs.com/package/pri)

**Pri** is a toolkit for building web applications with React. **Helps you deal with everything with develop, so you can focus on the business logic.**

## Features

Pri can help you develop **project** and **component**.

- [Convention routing](https://prijs.github.io/pri-docs/project/pages/). Create pages according to convention without writing routing configuration.
- [Markdown support](https://prijs.github.io/pri-docs/project/markdown-page/). Write markdown page easily, just create a file using `.md` as suffixes.
- [Static export](https://prijs.github.io/pri-docs/project/deploy-to-github-pages/). Very easy to deploy to github pages.
- [Plugin mechanism](https://prijs.github.io/pri-docs/plugin/). 20+ built-in plugins, and more community plug-ins.
- [Mocks](https://prijs.github.io/pri-docs/project/mock-request/). Using service worker to mock request!
- [WebUI](https://prijs.github.io/pri-docs/project/webui/). You can create page, or config files by click button in webui!
- [Dynamic Import](https://prijs.github.io/pri-docs/project/dynamic-import/). Automatic page level dynamic routing.
- [Typescript](https://prijs.github.io/pri-docs/project/typescript/). 100% typescript source code, for project maintainability considerations, only TS projects are supported!
- [Configuration file auto creator](https://prijs.github.io/pri-docs/project/project-files/). Never worry about configuration files and updates of configuration files. This is automatic.
- [Auto dll](https://prijs.github.io/pri-docs/project/auto-dlls/). Speed up hot loader.
- And more, [see Docs](https://prijs.github.io/pri-docs/).

## Setup

```shell
# 1. Create an empty folder, install pri locally.
$ npm i pri --save
# 2. Init project files, and you will have following npm scripts.
$ npx pri init

# Start dev server
$ npm start

# Build
$ npm run build

# Test
$ npm test

# Preview of production environment
$ npm run preview

# See bundle size analyse
$ npm run analyse

# Bundle to one file
$ npm run bundle

# Start docs server
$ npm run docs

# Format all sources code
$ npm run format
```

## File Structure

**Project:**

```text
.
├── .temp                     # Gitignored. Temporary file folder.
├── coverage                  # Gitignored. Code coverage folder.
├── dist                      # Gitignored. Dist folder, auto generated by `npm run build`.
├── tests                     # Tests folder.
├── src                       # Source files folder.
│   ├── pages                 # Page files.
│   ├── layouts               # Layout files.
│   ├── components            # Component files.
│   └── utils                 # Util files.
│── pri.config.ts             # Config file.
└── ...other-files            # Auto generated by `npx pri init`.
```

**Component:**

```text
.
├── .temp                     # Gitignored. Temporary file folder.
├── coverage                  # Gitignored. Code coverage folder.
├── dist                      # Gitignored. Dist folder, auto generated by `npm run build`.
├── tests                     # Tests folder.
├── src                       # Source files folder. Anything here.
│── pri.config.ts             # Config file.
└── ...other-files            # Auto generated by `npx pri init`.
```

## Inspired

- [next.js](https://github.com/zeit/next.js)
- [umi](https://github.com/umijs/umi)
- [rekit](https://github.com/supnate/rekit)

## Q&A

### Using in windows

[fedora](https://getfedora.org/). Using windows subsystem for Linux.
