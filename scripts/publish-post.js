#!/usr/bin/env node

/**
 * publish-post.js
 * A script to parse frontmatter from markdown files and publish posts via API
 * 
 * Usage: node publish-post.js <path-to-markdown-file>
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const matter = require('gray-matter');
const dotenv = require('dotenv');

// Load environment variables directly
const rootEnvPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(rootEnvPath)) {
    dotenv.config({ path: rootEnvPath });
}

// Get the markdown file path from command line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node publish-post.js <path-to-markdown-file>');
  process.exit(1);
}

const markdownFilePath = args[0];

// Check if file exists
if (!fs.existsSync(markdownFilePath)) {
  console.error(`Error: File '${markdownFilePath}' not found.`);
  process.exit(1);
}

// Read the file content
const fileContent = fs.readFileSync(markdownFilePath, 'utf8');

// Parse frontmatter and content
console.log(`Parsing frontmatter from ${markdownFilePath}...`);

// Parse the markdown file using gray-matter
const { data: frontmatter, content } = matter(fileContent);

// Validate required fields
const requiredFields = ['title', 'slug', 'summary', 'tags'];
const missingFields = requiredFields.filter(field => !frontmatter[field]);

if (missingFields.length > 0) {
  console.error(`Error: Missing required frontmatter fields: ${missingFields.join(', ')}`);
  process.exit(1);
}

// Ensure tags is an array
if (!Array.isArray(frontmatter.tags)) {
  frontmatter.tags = [frontmatter.tags];
}

// Log extracted frontmatter
console.log('Extracted frontmatter:');
console.log(`Title: ${frontmatter.title}`);
console.log(`Slug: ${frontmatter.slug}`);
console.log(`Summary: ${frontmatter.summary}`);
console.log(`Tags: ${frontmatter.tags.join(', ')}`);
console.log(`Content length: ${content.length} characters`);

// Prepare the request payload
const payload = {
  slug: frontmatter.slug,
  title: frontmatter.title,
  summary: frontmatter.summary,
  content: content,
  tags: frontmatter.tags
};

// Get API URL from environment variable
const port = process.env.API_PORT;
const apiUrl = `http://localhost:${port}/internal/posts`;

console.log(`Publishing post to ${apiUrl}...`);

// Make the API call
axios.post(apiUrl, payload, {
  headers: { 'Content-Type': 'application/json' }
})
  .then(response => {
    console.log('Post published successfully!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error('Error publishing post:');
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    process.exit(1);
  });