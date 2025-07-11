#!/usr/bin/env node

/**
 * update-post.js
 * A script to update a blog post via the API using a markdown file
 * 
 * Usage: node update-post.js <slug> <path-to-markdown-file>
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

// Get command line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node update-post.js <slug> <path-to-markdown-file>');
    process.exit(1);
}

const slug = args[0];
const markdownFilePath = args[1];

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

// Build payload with available fields (all optional for update)
const payload = { slug };

if (frontmatter.title) payload.title = frontmatter.title;
if (frontmatter.summary) payload.summary = frontmatter.summary;
if (content.trim()) payload.content = content;
if (frontmatter.tags) {
    // Ensure tags is an array
    if (!Array.isArray(frontmatter.tags)) {
        payload.tags = [frontmatter.tags];
    } else {
        payload.tags = frontmatter.tags;
    }
}

// Check if we have any fields to update
const updateFields = Object.keys(payload).filter(key => key !== 'slug');
if (updateFields.length === 0) {
    console.error('Error: No fields to update found in the markdown file.');
    process.exit(1);
}

// Log extracted frontmatter
console.log('Fields to update:');
if (payload.title) console.log(`Title: ${payload.title}`);
if (payload.summary) console.log(`Summary: ${payload.summary}`);
if (payload.content) console.log(`Content length: ${payload.content.length} characters`);
if (payload.tags) console.log(`Tags: ${payload.tags.join(', ')}`);

// Get API URL from environment variable
const port = process.env.API_PORT;
const apiUrl = `http://localhost:${port}/internal/posts`;
const updateUrl = `${apiUrl}/${slug}`;

console.log(`Updating post with slug "${slug}" at ${updateUrl}...`);

// Make the API call
axios.put(updateUrl, payload, {
    headers: { 'Content-Type': 'application/json' }
})
    .then(response => {
        console.log('Post updated successfully!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
    })
    .catch(error => {
        console.error('Error updating post:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Response:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
        process.exit(1);
    });