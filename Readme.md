# 🍺 brew-cli

**The Ultimate Project Scaffolder — Brew a fresh project in seconds.**

`brew-cli` is a beautiful, interactive CLI tool that scaffolds production-ready projects across the Node.js ecosystem. Pick your platform, language, and framework — and let brew handle the rest.

> No more copying boilerplate. No more wiring configs by hand. Just brew it.

---

## Why brew-cli?

Setting up a new project should take seconds, not hours. `brew-cli` gives you a single command to scaffold fully configured projects across **10+ frameworks**, with support for both JavaScript and TypeScript out of the box. It wraps official CLIs (Next.js, Angular, NestJS, Expo, etc.) and ships battle-tested templates for Express and Fastify — so you always get the canonical project structure, not a random skeleton.

---

## Supported Frameworks

| Framework         | JavaScript | TypeScript |
| ----------------- | :--------: | :--------: |
| Express           |     ✅     |     ✅     |
| Fastify           |     ✅     |     ✅     |
| NestJS            |     ✅     |     ✅     |
| React (Vite)      |     ✅     |     ✅     |
| Next.js           |     ✅     |     ✅     |
| Vue.js (Vite)     |     ✅     |     ✅     |
| Angular           |     ✅     |     ✅     |
| React Native CLI  |     —      |     ✅     |
| React Native Expo |     ✅     |     ✅     |

---

## Quick Start

### Install globally

```bash
npm install -g brew-cli
```

### Scaffold a project

```bash
create-brew-app my-app
```

Or just run it directly without installing:

```bash
npx brew-cli my-app
```

You can also run it without a project name — brew will prompt you for one:

```bash
create-brew-app
```

---

## How It Works

`brew-cli` walks you through an interactive flow right in your terminal:

```
1.  Choose your platform     →  Node.js (more coming soon)
2.  Pick a language           →  JavaScript or TypeScript
3.  Select a framework        →  Express, Next.js, React, etc.
4.  Name your project         →  (if not passed as an argument)
5.  Sit back                  →  brew scaffolds everything for you
```

Once complete, you'll see the **CHEERS** screen with your project path and next steps.

### What brew does under the hood

For **Express** and **Fastify**, brew copies from its own curated templates — pre-configured with sensible defaults so you can start coding immediately.

For everything else (**Next.js, React, Vue, Angular, NestJS, Expo, React Native CLI**), brew delegates to the official framework CLI with optimal flags — skip-install, skip-git, correct language template — then applies finishing touches like standardizing `package.json` fields and initializing a clean git repo.

---

## Example

```bash
$ create-brew-app my-app

  ██████╗ ██████╗ ███████╗██╗    ██╗   ██████╗ ██╗     ██╗
  ██╔══██╗██╔══██╗██╔════╝██║    ██║   ██╔═══╝ ██║     ██║
  ██████╔╝██████╔╝█████╗  ██║ █╗ ██║   ██║     ██║     ██║
  ██╔══██╗██╔══██╗██╔══╝  ██║███╗██║   ██║     ██║     ██║
  ██████╔╝██║  ██║███████╗╚███╔███╔╝   ╚██████╗███████╗██║
  ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝     ╚═════╝╚══════╝╚═╝

  ⚡ The Ultimate Project Scaffolder for 2026

  ➜  Choose your platform:
     ❯ Node.js
       Other Framework

  ➜  Select language for node:
     ❯ TypeScript
       JavaScript

  ➜  Which framework or library do you want to use?
       Express
     ❯ Fastify
       NestJS
       ...

  ✨ Brewing complete! Your project is served hot.

  🚀 NEXT STEPS:
     1. cd my-app
     2. npm install
     3. npm run dev

  Happy Coding! May your brew never turn cold. 🍺
```

---

## Requirements

- **Node.js** v18 or later
- **npm** v8 or later
- **git** (optional, for auto-initializing repos)

---

## Roadmap

- 🔜 Python (Flask, FastAPI, Django)
- 🔜 Go (Gin, Fiber)
- 🔜 Rust (Actix, Axum)
- 🔜 Custom template support
- 🔜 Plugin system for post-scaffold hooks

More platforms and frameworks are actively being added. Contributions and suggestions are welcome!

---

## Contributing

Contributions are welcome! If you'd like to add a framework, fix a bug, or improve the templates:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/add-django-support`)
3. Commit your changes (`git commit -m 'feat: add Django scaffolding'`)
4. Push to the branch (`git push origin feat/add-django-support`)
5. Open a Pull Request

---

## License

MIT © [Harsh Mer](https://github.com/aspect-developer) · [Keval Tank](https://github.com/Keval-Tank)
