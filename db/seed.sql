-- Seed data for posts, tags, and tag_posts
PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- Tags
INSERT
OR IGNORE INTO tags (tag_name)
VALUES
  ('tech'),
  ('personal'),
  ('tutorial'); 

-- Posts
INSERT INTO
  posts (id, slug, published_at, title, summary, content)
VALUES
  (
    1,
    'welcome-to-the-blog',
    strftime ('%s', '2025-04-24 12:00:00'),
    'Welcome to the Blog',
    'Welcome to my corner of the internet!',
    '# Welcome to the Blog

Welcome to my corner of the internet! I''m excited to launch this blog as a platform to share my thoughts, experiences, and knowledge about technology, personal development, and everything in between.

I encourage you to subscribe to updates, leave comments, and engage with the community we''ll build here. Let''s learn and grow together!'
  ),
  (
    2,
    'second-thoughts',
    strftime ('%s', '2024-04-25 09:30:00'),
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

... 

Stay tuned for more content coming soon!'
  ),
  (
    3,
    'tagging-demo',
    strftime ('%s', '2025-04-26 15:45:00'),
    'Tagging Demo',
    'How to implement a robust tagging system in your blog',
    '# Tagging Demo

One of the key features of any modern blog is the ability to organize content through tags. Today, I''ll walk you through how I implemented tagging in this blog using SQLite.

... 

Stay tuned for more technical deep-dives into the blog''s features!'
  );

-- Tag-Post relationships
INSERT
OR IGNORE INTO tag_posts (tag_id, post_id)
VALUES
  (
    (
      SELECT
        id
      FROM
        tags
      WHERE
        tag_name = 'tech'
    ),
    1
  ),
  (
    (
      SELECT
        id
      FROM
        tags
      WHERE
        tag_name = 'personal'
    ),
    1
  ),
  (
    (
      SELECT
        id
      FROM
        tags
      WHERE
        tag_name = 'tech'
    ),
    2
  ),
  (
    (
      SELECT
        id
      FROM
        tags
      WHERE
        tag_name = 'tutorial'
    ),
    3
  );

-- Comments
INSERT INTO
  comments (post_id, author_name, content, created_at)
VALUES
  (
    1,
    'Alice Johnson',
    'Great first post! Looking forward to more content.',
    strftime ('%s', '2025-04-24 13:30:00')
  ),
  (
    1,
    'Bob Smith',
    'The blog looks promising. Keep it up!',
    strftime ('%s', '2025-04-24 14:15:00')
  ),
  (
    2,
    'Charlie Brown',
    'Interesting perspective. I agree with your points.',
    strftime ('%s', '2025-04-25 10:45:00')
  );

-- Nested comments (replies)
INSERT INTO
  comments (
    post_id,
    parent_id,
    author_name,
    content,
    created_at
  )
VALUES
  (
    1,
    1,
    'Bob Smith',
    'Thanks Alice! I''m excited to see where this goes.',
    strftime ('%s', '2025-04-24 13:45:00')
  ),
  (
    1,
    1,
    'Charlie Brown',
    'I''m also looking forward to more posts!',
    strftime ('%s', '2025-04-24 14:00:00')
  );

COMMIT;