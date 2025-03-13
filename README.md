# liza-app

`liza` is a React app built with Vite designed as a frontend web app.

## Building

This project is built with Vite using NPM. Specifically, Node.JS v22.14.0 and NPM v11.2.0 at time of creation. With Node.JS and NPM installed, navigate to this directory and run

```bash
npm i
```

to install the dependencies. Refer to `package.json` for all options. Most frequently:

- Test: (to be done with `vitest` via `npm run test`)
- Run the Vite hot-loaded server `npm run dev`
- Build: `npm run build`

ESLint and Prettier are included. It's best to configure these in an IDE (such as VS Code) via plugins, so that you don't have to run the `lint` and `prettier` commands.

Prettier simply formats the code consistently, such as using trailing commas, no final semicolons, and spaces rather than tabs. After enabling format-on-save in an IDE, you can use this to write messy POJOs and let the editor format it for you.

ESLint ensures strong code practices, such as avoiding unused declarations. It is configured for this React project to provide useful feedback, such as consistent naming conventions, and warnings when multiple React components are exported by the same file (which breaks hot-loading features in dev).
