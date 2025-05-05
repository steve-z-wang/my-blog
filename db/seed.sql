-- Seed data for posts, tags, and tag_posts
PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- Tags (adding all tags upfront)
INSERT OR IGNORE INTO tags(tag_name) VALUES
  ('tech'),
  ('personal'),
  ('tutorial'),
  ('announcement'),
  ('how-to'),
  ('lifestyle'),
  ('news'),
  ('opinion');

-- Posts (explicit post_id for deterministic seeded relations)
INSERT INTO posts(post_id, published_at, title, summary, content) VALUES
  ('welcome-to-the-blog', 
    strftime('%s','2025-04-24 12:00:00'), 
    'Welcome to the Blog',
    'Welcome to my corner of the internet!',
    '# Welcome to the Blog

Welcome to my corner of the internet! I''m excited to launch this blog as a platform to share my thoughts, experiences, and knowledge about technology, personal development, and everything in between.

## What to Expect

In this space, you''ll find:
- Deep dives into technical topics
- Personal reflections on software development
- Tutorials and how-to guides
- Updates about my projects and experiments

## Why Another Blog?

While there are countless tech blogs out there, I believe everyone has unique experiences and perspectives worth sharing. My goal is to document my journey, share what I learn along the way, and hopefully help others who might be walking a similar path.

## Technical Stack

This blog is built using modern web technologies, including:
- Next.js for the frontend
- SQLite for the database
- Markdown for content management
- Tailwind CSS for styling

I''ll be sharing more about the technical decisions and implementation details in future posts.

## Join the Journey

I encourage you to subscribe to updates, leave comments, and engage with the community we''ll build here. Let''s learn and grow together!'),

  ('second-thoughts', 
    strftime('%s','2025-04-25 09:30:00'), 
    'Second Thoughts',
    'Reflections on the journey ahead and the direction of this platform',
    '# Second Thoughts

After launching this blog yesterday, I''ve been reflecting on the journey ahead and wanted to share some additional thoughts about the direction of this platform.

## The Power of Writing

Writing is not just about sharing knowledge—it''s about crystallizing our own thoughts and understanding. Through this blog, I hope to:

1. **Deepen Understanding**: By explaining concepts to others, we often understand them better ourselves
2. **Build Community**: Create a space for meaningful discussions and connections
3. **Document Growth**: Track my progress and evolution as a developer
4. **Share Insights**: Help others avoid pitfalls I''ve encountered

## Content Strategy

Moving forward, I plan to publish content in these main categories:

### Technical Tutorials
- Step-by-step guides
- Best practices
- Tool comparisons
- Code snippets and examples

### Personal Development
- Learning strategies
- Productivity tips
- Career insights
- Work-life balance

### Project Updates
- Behind-the-scenes looks at my work
- Technical decisions and trade-offs
- Lessons learned from failures and successes

## Commitment to Quality

While I''m excited to share content regularly, my primary focus will be on quality over quantity. Each post will be:
- Well-researched and accurate
- Clear and accessible
- Practical and actionable
- Open to discussion and feedback

Stay tuned for more content coming soon!'),

  ('tagging-demo', 
    strftime('%s','2025-04-26 15:45:00'), 
    'Tagging Demo',
    'How to implement a robust tagging system in your blog',
    '# Tagging Demo

One of the key features of any modern blog is the ability to organize content through tags. Today, I''ll walk you through how I implemented tagging in this blog using SQLite.

## Understanding Tags

Tags serve multiple purposes:
1. Content Organization
2. Improved Discoverability
3. Related Content Suggestions
4. SEO Benefits

## Database Schema

Here''s how we structure our tags in SQLite:

```sql
CREATE TABLE tags (
    tag_id INTEGER PRIMARY KEY,
    tag_name TEXT UNIQUE NOT NULL
);

CREATE TABLE tag_posts (
    tag_id INTEGER,
    post_id TEXT,
    PRIMARY KEY (tag_id, post_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);
```

## Implementation Details

### Tag Creation
- Validation and normalization of tag names
- Preventing duplicate tags
- Handling special characters

### Tag Assignment
- Multiple tags per post
- Efficient querying
- Maintaining relationships

### Tag Management
- Adding/removing tags
- Merging similar tags
- Tag statistics and usage metrics

## Best Practices

1. **Consistency**: Establish naming conventions for tags
2. **Moderation**: Avoid too many or too few tags
3. **Relevance**: Ensure tags accurately reflect content
4. **Maintenance**: Regularly review and clean up unused tags

## Future Improvements

- Tag suggestions based on content
- Tag clouds and visualization
- Related posts by tag similarity
- Tag-based content discovery

Stay tuned for more technical deep-dives into the blog''s features!'),

  ('getting-started-with-sqlite', 
    strftime('%s','2025-04-27 10:20:00'), 
    'Getting Started with SQLite',
    'A comprehensive guide to getting started with SQLite database',
    '# Getting Started with SQLite

SQLite is a powerful, self-contained database engine that''s perfect for many applications. In this comprehensive guide, we''ll explore everything you need to know to get started.

## Why SQLite?

SQLite offers several advantages:
- Zero-configuration required
- Self-contained in a single file
- ACID compliant
- Cross-platform compatibility
- No separate server process
- Excellent documentation

## Installation and Setup

### macOS
```bash
brew install sqlite3
```

### Linux
```bash
sudo apt-get install sqlite3
```

### Windows
Download the precompiled binaries from the official SQLite website.

## Basic Operations

### Creating a Database
```sql
sqlite3 mydatabase.db
```

### Creating Tables
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE
);
```

### Basic Queries
```sql
-- Insert data
INSERT INTO users (username, email) VALUES (''john_doe'', ''john@example.com'');

-- Select data
SELECT * FROM users WHERE username LIKE ''john%'';

-- Update data
UPDATE users SET email = ''new@example.com'' WHERE username = ''john_doe'';

-- Delete data
DELETE FROM users WHERE username = ''john_doe'';
```

## Advanced Features

### Transactions
```sql
BEGIN TRANSACTION;
-- Your SQL statements here
COMMIT;
```

### Foreign Keys
```sql
PRAGMA foreign_keys = ON;
```

### Indexes
```sql
CREATE INDEX idx_username ON users(username);
```

## Best Practices

1. **Use Transactions**: Especially for multiple related operations
2. **Index Wisely**: Balance between query speed and write performance
3. **Regular Backups**: Use .backup command or file copy
4. **Optimize Performance**: Regular VACUUM and index maintenance

## Common Pitfalls

- Not enabling foreign key constraints
- Missing indexes on frequently queried columns
- Not using prepared statements
- Failing to handle concurrent access properly

## Tools and Resources

- DB Browser for SQLite
- SQLite Command Line Shell
- SQLite Documentation
- Online SQLite Playground

## Next Steps

- Exploring more advanced queries
- Understanding the SQLite query planner
- Working with SQLite in various programming languages
- Database optimization techniques

Stay tuned for more detailed posts about specific SQLite features!'),

  ('personal-reflections', 
    strftime('%s','2025-04-28 14:00:00'), 
    'Personal Reflections',
    'Thoughts on maintaining work-life balance as a developer',
    '# Personal Reflections

After several years in the tech industry, I''ve learned some valuable lessons about maintaining a healthy work-life balance while staying productive and growing professionally.

## The Importance of Balance

Finding the right balance between work and personal life is crucial for:
- Long-term sustainability
- Mental health
- Professional growth
- Personal relationships

## My Current System

### Morning Routine
- 6:00 AM: Wake up and light exercise
- 6:30 AM: Meditation and planning
- 7:00 AM: Deep work session
- 9:00 AM: Team meetings and collaboration

### Focus Techniques
- Pomodoro method (25/5 splits)
- Regular breaks
- Nature walks
- Digital detox periods

### Learning Strategy
- 1 hour daily for learning
- Weekend project exploration
- Monthly skill assessment
- Quarterly goal review

## Challenges and Solutions

### Challenge 1: Information Overload
- Curated RSS feeds
- Scheduled reading times
- Focus on fundamentals
- Quality over quantity

### Challenge 2: Project Management
- Clear prioritization
- Regular retrospectives
- Automated workflows
- Documentation habits

### Challenge 3: Energy Management
- Regular exercise
- Proper nutrition
- Sleep hygiene
- Stress management

## Looking Forward

My goals for the upcoming year:
1. Deeper technical expertise
2. More open source contributions
3. Regular blog posts
4. Community engagement

Remember, it''s a marathon, not a sprint. Take care of yourself first!'),

  ('site-maintenance-notice', 
    strftime('%s','2025-04-30 08:15:00'), 
    'Site Maintenance Notice',
    'Important information about upcoming site maintenance',
    '# Site Maintenance Notice

We will be performing scheduled maintenance to improve the blog''s performance and reliability.

## Maintenance Window

- **Date**: May 1st, 2025
- **Time**: 2 AM to 4 AM UTC
- **Duration**: Approximately 2 hours

## What''s Being Updated

During this maintenance period, we will be:

1. Upgrading server infrastructure
2. Implementing database optimizations
3. Deploying new security patches
4. Adding performance monitoring tools

## Expected Impact

- Site will be unavailable during the maintenance window
- No data loss is expected
- Comments and drafts will be preserved
- Email notifications may be delayed

## Preparation Steps

### For Readers
- Save any draft comments
- Download any content you need access to
- Check back after 4 AM UTC

### For Contributors
- Complete pending drafts
- Save any work in progress
- Verify content after maintenance

## Post-Maintenance

We will post an update once maintenance is complete with:
- Summary of changes
- New features available
- Performance improvements
- Any action items for users

Thank you for your patience and understanding!'),

  ('tutorial-deploying-with-docker', 
    strftime('%s','2025-05-01 12:00:00'), 
    'Tutorial: Deploying with Docker',
    'A comprehensive guide to containerizing your Node.js application',
    '# Tutorial: Deploying with Docker

Learn how to containerize your Node.js application and deploy it using Docker. This guide covers everything from basic concepts to production best practices.

## Prerequisites

- Basic Node.js knowledge
- Docker installed locally
- Text editor of choice
- Terminal access

## Docker Basics

### What is Docker?
Docker is a platform for developing, shipping, and running applications in containers. Containers are:
- Lightweight
- Portable
- Self-sufficient
- Scalable

### Key Concepts
1. Images
2. Containers
3. Dockerfile
4. Docker Compose
5. Volumes
6. Networks

## Creating a Dockerfile

```dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]
```

## Building and Running

```bash
# Build image
docker build -t myapp:latest .

# Run container
docker run -p 3000:3000 myapp:latest
```

## Development Workflow

### Docker Compose
```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development
```

### Hot Reloading
- Using nodemon
- Volume mounts
- Environment variables

## Production Considerations

### Security
- Non-root user
- Multi-stage builds
- Security scanning
- Secret management

### Performance
- Layer caching
- Image size optimization
- Resource limits
- Health checks

### Monitoring
- Logging
- Metrics
- Tracing
- Alerts

## Deployment Options

1. Manual deployment
2. CI/CD pipelines
3. Kubernetes
4. Cloud services

## Best Practices

1. Use specific versions
2. Layer optimization
3. Security scanning
4. Resource management
5. Proper documentation

## Troubleshooting

Common issues and solutions:
- Build failures
- Runtime errors
- Network issues
- Volume permissions

Stay tuned for more Docker tutorials!'),

  ('tech-news-roundup', 
    strftime('%s','2025-05-01 16:45:00'), 
    'Tech News Roundup',
    'Weekly summary of the most important tech news and updates',
    '# Tech News Roundup

Stay updated with this week''s most significant developments in the tech world.

## Major Announcements

### BigCo''s New AI Platform
- GPT-4 integration
- Custom model training
- Enterprise features
- Privacy focus

### Security Updates
1. Critical vulnerability in popular framework
2. Major browser security patch
3. Cloud provider security enhancements
4. Mobile OS security updates

### Startup Scene
- Futuretech raises $100M
- InnovateAI acquisition
- New unicorn in fintech
- Emerging trends

## Industry Trends

### AI/ML
- New research papers
- Tool releases
- Ethics discussions
- Implementation guides

### Cloud Computing
- Service updates
- Price changes
- New regions
- Feature launches

### Web Development
- Framework updates
- Browser features
- Performance tools
- Best practices

## Open Source Updates

### Notable Releases
- Popular framework v2.0
- Database engine upgrade
- Testing tool enhancement
- Security scanner update

### Community News
- Conference announcements
- Governance changes
- Notable contributions
- Project milestones

## Research & Innovation

### Academic Papers
- ML breakthroughs
- Systems design
- Security research
- Performance studies

### Patents & IP
- Notable filings
- Legal developments
- Industry impact
- Future implications

Stay tuned for next week''s roundup!'),

  ('opinion-future-of-web-development', 
    strftime('%s','2025-05-02 09:00:00'), 
    'Opinion: Future of Web Development',
    'Exploring emerging trends and technologies shaping web development',
    '# Opinion: Future of Web Development

As we look ahead to the next decade of web development, several emerging technologies and trends are poised to reshape how we build and interact with web applications.

## Current State

### Frontend
- Component-based architecture
- Static site generation
- JAMstack popularity
- Web Components

### Backend
- Serverless architecture
- Edge computing
- GraphQL adoption
- Microservices

## Emerging Technologies

### WebAssembly
- Near-native performance
- Language interoperability
- Browser compatibility
- Use cases expanding

### AI Integration
- Code generation
- Testing automation
- Performance optimization
- User experience

### Edge Computing
- Reduced latency
- Global distribution
- Cost efficiency
- Simplified deployment

## Predictions

### Short-term (1-2 years)
1. More AI-powered development tools
2. Increased WebAssembly adoption
3. Edge-first architectures
4. Better build tools

### Medium-term (3-5 years)
1. AI pair programming standard
2. WebAssembly as primary runtime
3. Edge computing dominance
4. New programming paradigms

### Long-term (5+ years)
1. AI-driven development
2. Natural language interfaces
3. Quantum computing impact
4. New internet protocols

## Challenges

### Technical
- Performance optimization
- Security concerns
- Tool complexity
- Standard fragmentation

### Social
- Privacy concerns
- Digital divide
- Ethical considerations
- Accessibility needs

## Opportunities

### Developer Experience
- Better tooling
- Automated workflows
- Simplified deployment
- Enhanced debugging

### User Experience
- Faster applications
- Better accessibility
- Personalization
- Offline capabilities

## Preparing for the Future

### Skills to Develop
1. AI/ML fundamentals
2. Systems design
3. Performance optimization
4. Security practices

### Tools to Watch
1. Next-gen frameworks
2. AI development tools
3. WebAssembly toolchains
4. Edge platforms

The future of web development is exciting and challenging. Stay curious and keep learning!');

-- Tag-Post relationships
INSERT OR IGNORE INTO tag_posts(tag_id, post_id) VALUES
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'welcome-to-the-blog'),
  ((SELECT tag_id FROM tags WHERE tag_name='personal'), 'welcome-to-the-blog'),
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'second-thoughts'),
  ((SELECT tag_id FROM tags WHERE tag_name='tutorial'), 'tagging-demo'),
  ((SELECT tag_id FROM tags WHERE tag_name='tutorial'), 'getting-started-with-sqlite'),
  ((SELECT tag_id FROM tags WHERE tag_name='how-to'), 'getting-started-with-sqlite'),
  ((SELECT tag_id FROM tags WHERE tag_name='personal'), 'personal-reflections'),
  ((SELECT tag_id FROM tags WHERE tag_name='lifestyle'), 'personal-reflections'),
  ((SELECT tag_id FROM tags WHERE tag_name='opinion'), 'personal-reflections'),
  ((SELECT tag_id FROM tags WHERE tag_name='announcement'), 'site-maintenance-notice'),
  ((SELECT tag_id FROM tags WHERE tag_name='tutorial'), 'tutorial-deploying-with-docker'),
  ((SELECT tag_id FROM tags WHERE tag_name='how-to'), 'tutorial-deploying-with-docker'),
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'tutorial-deploying-with-docker'),
  ((SELECT tag_id FROM tags WHERE tag_name='news'), 'tech-news-roundup'),
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'tech-news-roundup'),
  ((SELECT tag_id FROM tags WHERE tag_name='opinion'), 'opinion-future-of-web-development'),
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'opinion-future-of-web-development');

-- Comments
INSERT INTO comments(post_id, author_name, content, created_at) VALUES
  ('welcome-to-the-blog', 'Alice Johnson', 'Great first post! Looking forward to more content.', strftime('%s','2025-04-24 13:30:00')),
  ('welcome-to-the-blog', 'Bob Smith', 'The blog looks promising. Keep it up!', strftime('%s','2025-04-24 14:15:00')),
  ('second-thoughts', 'Charlie Brown', 'Interesting perspective. I agree with your points.', strftime('%s','2025-04-25 10:45:00')),
  ('getting-started-with-sqlite', 'Diana Ross', 'This tutorial was exactly what I needed. Thanks!', strftime('%s','2025-04-27 11:30:00')),
  ('personal-reflections', 'Ethan Hunt', 'Your work-life balance tips are really helpful.', strftime('%s','2025-04-28 15:20:00')),
  ('tutorial-deploying-with-docker', 'Fiona Apple', 'Clear and concise tutorial. Well done!', strftime('%s','2025-05-01 13:15:00'));

-- Nested comments (replies)
INSERT INTO comments(post_id, parent_comment_id, author_name, content, created_at) VALUES
  ('welcome-to-the-blog', 1, 'Bob Smith', 'Thanks Alice! I''m excited to see where this goes.', strftime('%s','2025-04-24 13:45:00')),
  ('welcome-to-the-blog', 1, 'Charlie Brown', 'I''m also looking forward to more posts!', strftime('%s','2025-04-24 14:00:00')),
  ('getting-started-with-sqlite', 4, 'Ethan Hunt', 'I had the same experience. This tutorial made it much clearer.', strftime('%s','2025-04-27 12:00:00')),
  ('personal-reflections', 5, 'Fiona Apple', 'I''ve been struggling with this too. Thanks for sharing!', strftime('%s','2025-04-28 16:30:00'));

COMMIT;

