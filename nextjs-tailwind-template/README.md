# Next.js 15 Starter with Tailwind CSS

A modern, production-ready starter template for Next.js 15 applications with Tailwind CSS integration.

## 🚀 Features

- **Next.js 15** - Latest version of the React framework
- **React 19** - Latest version of React
- **TypeScript 5** - Type safety and better developer experience
- **ESLint 9** - Code linting and style enforcement
- **Prettier 3** - Code formatting
- **Tailwind CSS 4** - Utility-first CSS framework
- **App Directory** - Next.js 13+ app directory structure
- **System, Light & Dark Mode** - Built-in theme support
- **Next.js Bundle Analyzer** - Bundle size optimization
- **Docker Support** - Containerization with Node.js 22.15.0 (Alpine)
- **Bun Support** - Alternative runtime with Bun 1.2.12 (Alpine)

### 🛠️ Development Tools

#### ESLint Plugins
- @eslint/js
- typescript-eslint
- eslint-plugin-react
- @next/eslint-plugin-next
- eslint-config-prettier
- eslint-plugin-tailwindcss
- eslint-plugin-import
- eslint-plugin-promise

#### Prettier Plugins
- @trivago/prettier-plugin-sort-imports
- prettier-plugin-tailwindcss

### 💻 Recommended VS Code Extensions

- Auto Close Tag
- Better Comments
- DotENV
- EditorConfig for VS Code
- ESLint
- formate: CSS/LESS/SCSS formatter
- Git History
- Import Cost
- JavaScript Booster
- npm Intellisense
- Prettier - Code formatter
- Todo Tree
- Turbo Console Log
- Package Json Upgrade
- Visual Studio Code Commitizen Support
- Markdown All in One

## 🏁 Getting Started

### Prerequisites

- **Bun**: Version 1.2.12 or higher OR
- **Node.js**: Version 20.18.0 or higher
- **Docker**: For containerized deployment (optional)

### Installation

1. **Clone the Repository**:
    ```bash
    git clone <your-repo-url>
    cd <your-project-name>
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    # or with Yarn
    yarn install
    # or with pnpm
    pnpm install
    # or with Bun
    bun install
    ```

3. **Run Development Server**:
    ```bash
    npm run dev
    # or with Yarn
    yarn dev
    # or with pnpm
    pnpm dev
    # or with Bun
    bun dev
    ```

4. **Build for Production**:
    ```bash
    npm run build
    # or with Yarn
    yarn build
    # or with pnpm
    pnpm build
    # or with Bun
    bun run build
    ```

### 🐳 Docker Setup

Build and run the Docker container:

```bash
docker build . -t nextjs-starter-tailwind
# or if using Bun
docker build . -t nextjs-starter-tailwind -f Dockerfile.bun

docker run -p 3000:3000 nextjs-starter-tailwind
```

### ☁ Cloud Development Options

This project can be developed in various cloud environments:

- VS Code Web
- GitHub Codespaces
- CodeSandbox
- Gitpod
- StackBlitz
- Repl.it
- Glitch
- Codeanywhere

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
