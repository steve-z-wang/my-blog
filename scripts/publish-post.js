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

// Simple frontmatter parser
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    console.error('Error: No frontmatter found in the file. The file should start with "---".');
    process.exit(1);
  }

  const [, frontmatterStr, contentStr] = match;
  const frontmatter = {};

  // Parse each line of the frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Handle arrays like tags: [tag1, tag2]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim());
      }

      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: contentStr.trim() };
}

// Parse the markdown file
const { frontmatter, content } = parseFrontmatter(fileContent);

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

// Get API URL from environment or use default
const apiUrl = process.env.API_URL || 'http://localhost:3000/api/posts';

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