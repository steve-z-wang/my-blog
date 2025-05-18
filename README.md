# My Blog

A personal blogging platform built with modern web technologies.

**Live at: [stevewanglog.com](http://stevewanglog.com)**

## Description

This is a full-stack blog application with features for publishing, commenting, and subscribing. It uses a Node.js backend and React frontend, with SQLite for data storage.

Design inspired by [Lil'Log](https://lilianweng.github.io/)

## Features

- Post publishing with markdown support
- Tagging system
- Comments
- Email subscriptions
- Archive view
- Responsive design

## Project Structure

```
.
├── README.md
├── backend          # Node.js Express backend
├── blog-posts       # Markdown posts
├── db               # Database files and migrations
├── docker           # Docker configuration files
├── docker-compose.yml
├── frontend         # React frontend application
├── node_modules
├── package.json
├── packages         # Shared code packages
├── scripts          # Utility scripts
└── tsconfig.base.json
```

## Tech Stack

- Node.js
- React
- SQLite
- Docker

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/my-blog.git
cd my-blog
```

2. Install dependencies

```bash
npm install
```

### Development

1. Start the backend server

```bash
npm run dev:back
```

2. Start the frontend server

```bash
npm run dev:front
```

## Publishing Posts

Posts are written in Markdown and stored in the `blog-posts` directory. To publish a new post:

1. Create a markdown file in the `blog-posts` directory
2. Add frontmatter with title, slug, summary, and tags
3. Run the publish script:

```bash
node scripts/publish-post.js your-post-file.md
```

## Docker Deployment

The application can be deployed using Docker:

```bash
docker-compose up -d
```

## Continuous Deployment

This project includes a GitHub Actions workflow that automatically deploys changes when you push to the main branch.

### Setting Up GitHub Secrets

To use the deployment workflow, add the following secrets to your GitHub repository:

1. Go to your GitHub repository → Settings → Secrets and Variables → Actions
2. Add the following secrets:
   - `SERVER_HOST`: Your server's IP address or domain name
   - `SERVER_USERNAME`: SSH username for your server
   - `SERVER_SSH_KEY`: Your private SSH key that has access to the server

### How It Works

When you push changes to the main branch, the workflow will:

1. Connect to your server via SSH
2. Pull the latest code from GitHub
3. Stop the current Docker containers
4. Rebuild the Docker images
5. Start up the containers again

### Customizing the Deployment

You may need to update the server path in the `.github/workflows/deploy.yml` file to match your actual deployment path on the server.

## TODO

- [ ] Set up RSS
- [ ] Implement markdown content table
- [ ] Implement image support for blog posts
- [ ] Create email notification
- [ ] Add bot detection
- [ ] Set up backup system
- [ ] Add dark mode support

## License

This project is licensed under the MIT License - see the LICENSE file for details.
