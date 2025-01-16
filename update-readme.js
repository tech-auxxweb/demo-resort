const fs = require('fs');
const path = require('path');

// Configuration
const GITHUB_USERNAME = 'auxxweb'; // Replace with your GitHub username
const REPOSITORY_NAME = 'resort-webistes'; // Replace with your repository name
const BASE_URL = `https://${GITHUB_USERNAME}.github.io/${REPOSITORY_NAME}/`;

// Generate README content dynamically
function generateReadme(folderList) {
  const header = `# Resort Websites

This repository contains multiple resort websites, each hosted via GitHub Pages. Click on the links below to visit them.

| Resort Name             | Website Link      |
|-------------------------|-------------------|
`;
  const rows = folderList
    .map(
      (folder) =>
        `| ${folder.charAt(0).toUpperCase() + folder.slice(1)} | [Visit ${
          folder.charAt(0).toUpperCase() + folder.slice(1)
        }](${BASE_URL}${folder}/) |`
    )
    .join('\n');

  return header + rows;
}

// Get list of folders in the repository
function getFolders() {
  return fs
    .readdirSync(process.cwd())
    .filter(
      (file) =>
        fs.lstatSync(file).isDirectory() && // Check if it's a directory
        !file.startsWith('.') && // Exclude hidden files/folders
        !['node_modules', '.git', '.github'].includes(file) // Exclude common system folders
    );
}

// Update the README.md file
function updateReadme(content) {
  fs.writeFileSync('README.md', content, 'utf8');
}

// Main function
(function main() {
  const folders = getFolders();
  if (folders.length === 0) {
    console.error('No folders found. Ensure your repository has folders for each website.');
    process.exit(1);
  }

  const readmeContent = generateReadme(folders);
  updateReadme(readmeContent);
  console.log('README.md has been updated with links to your folders.');
})();
