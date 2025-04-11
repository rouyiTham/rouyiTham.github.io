# rouyiTham.github.io

A personal website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm (package manager)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rouyiTham/rouyiTham.github.io.git
cd rouyiTham.github.io
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. Start the development server:
```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The site will be available at `http://localhost:3000`.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager**: npm/yarn/pnpm
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
rouyiTham.github.io/
├── app/              # Next.js app directory (pages and layouts)
├── components/       # Reusable React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and shared logic
├── public/          # Static assets
├── styles/          # Global styles and Tailwind configurations
├── types/           # TypeScript type definitions
└── ...config files  # Various configuration files
```

## 🔧 Development

### Available Scripts

- `dev`: Start development server
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint
- `format`: Format code with Prettier

### Local Development

1. The development server supports hot reloading
2. Changes to components and pages will be reflected immediately
3. Use the browser's developer tools for debugging

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Keep components small and focused

## 🚀 Deployment

This site is automatically deployed to GitHub Pages. The deployment process is simple:

1. Push your changes to the `main` branch:
```bash
git add .
git commit -m "your commit message"
git push origin main
```

2. The GitHub Actions workflow will automatically:
   - Build the Next.js application
   - Deploy it to GitHub Pages
   - Make it available at https://rouyitham.github.io

You can check the deployment status in the "Actions" tab of your GitHub repository.

### Troubleshooting Deployments

If the deployment fails:
1. Check the GitHub Actions logs in the repository's Actions tab
2. Ensure your Next.js build is successful locally by running `npm run build`
3. Verify that all dependencies are properly listed in `package.json`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Support

For support, please open an issue in the GitHub repository.