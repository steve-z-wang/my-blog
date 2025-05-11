#!/usr/bin/env node

/**
 * delete-post.js
 * A script to delete a blog post via the API using its slug
 * 
 * Usage: node delete-post.js <slug>
 */

const axios = require('axios');

// Get the slug from command line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: node delete-post.js <slug>');
    process.exit(1);
}

const slug = args[0];

// Get API URL from environment or use default
const apiUrl = process.env.API_URL || 'http://localhost:8000/internal/posts';
const deleteUrl = `${apiUrl}/${slug}`;

console.log(`Deleting post with slug "${slug}" from ${deleteUrl}...`);

// Confirm deletion
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Are you sure you want to delete the post with slug "${slug}"? (y/N): `, answer => {
    if (answer.toLowerCase() !== 'y') {
        console.log('Operation cancelled.');
        readline.close();
        process.exit(0);
    }

    // Make the API call to delete the post
    axios.delete(deleteUrl, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            console.log('Post deleted successfully!');
            // Status 204 No Content means no response body
            if (response.status === 204) {
                console.log('Server returned status 204 No Content (successful deletion)');
            } else {
                console.log('Response:', JSON.stringify(response.data, null, 2));
            }
            readline.close();
        })
        .catch(error => {
            console.error('Error deleting post:');
            if (error.response) {
                console.error(`Status: ${error.response.status}`);
                console.error('Response:', JSON.stringify(error.response.data, null, 2));
            } else {
                console.error(error.message);
            }
            readline.close();
            process.exit(1);
        });
});