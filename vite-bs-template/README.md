# wrangler-landing

A starter template for building modern web apps with [Vite](https://vitejs.dev/) and [Bootstrap 5](https://getbootstrap.com/), featuring modular SCSS and easy Bootstrap customization.

## Features

- ⚡️ Fast development with Vite
- 🎨 Bootstrap 5 with modular SCSS imports
- 🛠 Easily override Bootstrap variables in `styles.scss`
- 🧩 Example modal and button usage
- 🧹 Clean, minimal setup

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

```sh
npm install
```

### Development

Start the dev server:

```sh
npm start
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

### Build

To build for production:

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## Project Structure

```
vite-bs-template/
├── dist/                # Production build output
├── node_modules/
├── package.json
├── package-lock.json
├── vite.config.js
├── src/
│   ├── index.html
│   ├── js/
│   │   └── main.js
│   └── scss/
│       ├── styles.scss
│       └── custom.scss
```

## Customizing Bootstrap

Edit `src/scss/styles.scss` to override Bootstrap variables before importing Bootstrap SCSS modules.  
Add your own styles in `src/scss/custom.scss`.

## Dependencies

- [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Sass](https://sass-lang.com/)
- [@popperjs/core](https://popper.js.org/)

## License

ISC
