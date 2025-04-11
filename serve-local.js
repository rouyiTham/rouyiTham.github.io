// Simple script to simulate GitHub Pages environment locally
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const express = require('express');

// Get the repo name from the package.json
const packageJson = require('./package.json');
const repoName = packageJson.name;
const PORT = 3000;

console.log(`\n📦 Setting up local environment to simulate GitHub Pages deployment for ${repoName}\n`);

// Create or update .env.production file
const envContent = `# Local simulation of GitHub Pages environment
NEXT_PUBLIC_BASE_PATH="/${repoName}"`;

fs.writeFileSync('.env.production', envContent);
console.log(`✅ Created .env.production with base path: /${repoName}`);

// Build the project
console.log('\n🔨 Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Create .nojekyll file
fs.writeFileSync(path.join('out', '.nojekyll'), '');
console.log('✅ Created .nojekyll file');

// Start Express server
console.log('\n🚀 Starting local server...');
const app = express();

// Serve static files from the 'out' directory under the basePath
app.use(`/${repoName}`, express.static(path.join(process.cwd(), 'out')));

// Redirect root to basePath
app.get('/', (req, res) => {
  res.redirect(`/${repoName}`);
});

// Handle 404 for any other paths
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <title>404 - Page Not Found</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                 display: flex; flex-direction: column; align-items: center; justify-content: center; 
                 height: 100vh; margin: 0; text-align: center; padding: 0 20px; }
          h1 { font-size: 48px; margin-bottom: 10px; }
          p { margin-top: 0; color: #666; }
          a { color: #0070f3; text-decoration: none; margin-top: 20px; display: inline-block; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>404</h1>
        <p>Page Not Found</p>
        <a href="/${repoName}">Go to Home Page</a>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`\n🌐 Server started!`);
  console.log(`🔗 Your site is available at: http://localhost:${PORT}/${repoName}`);
  console.log(`\n💡 Press Ctrl+C to stop the server\n`);
}); 