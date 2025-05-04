-- Seed data for posts, tags, and tag_posts
PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- Tags
INSERT OR IGNORE INTO tags(tag_name) VALUES
  ('tech'),
  ('personal'),
  ('tutorial');

-- Posts (explicit post_id for deterministic seeded relations)
INSERT INTO posts(post_id, publish_at, title, content) VALUES
  ('welcome-to-the-blog', strftime('%s','2025-04-24 12:00:00'), 'Welcome to the Blog', 'This is the inaugural post seeded into the database.'),
  ('second-thoughts', strftime('%s','2025-04-25 09:30:00'), 'Second Thoughts', 'Another seed post to showcase seeding with SQLite.'),
  ('tagging-demo', strftime('%s','2025-04-26 15:45:00'), 'Tagging Demo', 'How to attach tags to posts in SQLite.');

-- Tag‑Post relationships
INSERT OR IGNORE INTO tag_posts(tag_id, post_id) VALUES
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'welcome-to-the-blog'),
  ((SELECT tag_id FROM tags WHERE tag_name='personal'), 'welcome-to-the-blog'),
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'second-thoughts'),
  ((SELECT tag_id FROM tags WHERE tag_name='tutorial'), 'tagging-demo');


  -- Additional Tags
INSERT OR IGNORE INTO tags(tag_name) VALUES
  ('announcement'),
  ('how-to'),
  ('lifestyle'),
  ('news'),
  ('opinion');

-- Additional Posts
INSERT INTO posts(post_id, publish_at, title, summary, content) VALUES
  ('getting-started-with-sqlite', strftime('%s','2025-04-27 10:20:00'), 'Getting Started with SQLite',
      'A quick tutorial on setting up and querying an SQLite database.',
      'In this post, we explore how to install SQLite, create tables, and run simple SELECT queries.'),
  ('personal-reflections', strftime('%s','2025-04-28 14:00:00'), 'Personal Reflections',
      'Thoughts on productivity and work–life balance.',
      'I share my experiences juggling coding projects, exercise, and downtime over the past year.'),
  ('advanced-tagging-strategies', strftime('%s','2025-04-29 18:30:00'), 'Advanced Tagging Strategies',
      'How to design flexible tag schemas for your application.',
      'We dive into denormalized vs. normalized tag tables, tag hierarchies, and performance considerations.'),
  ('site-maintenance-notice', strftime('%s','2025-04-30 08:15:00'), 'Site Maintenance Notice',
      'Scheduled downtime and expected improvements.',
      'The blog will be offline for maintenance on May 1st from 2 AM to 4 AM UTC. We''ll be upgrading the server.'),
  ('tutorial-deploying-with-docker', strftime('%s','2025-05-01 12:00:00'), 'Tutorial: Deploying with Docker',
      'Step-by-step guide to containerizing your Node.js app.',
      'Learn how to write a Dockerfile, build an image, and run containers both locally and in production.'),
  ('tech-news-roundup', strftime('%s','2025-05-01 16:45:00'), 'Tech News Roundup',
      'This week’s highlights in the tech world.',
      'Covering the latest release from BigCo, security advisories, and startup funding news.'),
  ('opinion-future-of-web-development', strftime('%s','2025-05-02 09:00:00'), 'Opinion: Future of Web Development',
      'Thoughts on trends shaping the next decade.',
      'From WebAssembly to AI-driven UIs, here are the technologies I''m most excited about.');

-- Additional Tag-Post Relationships
INSERT OR IGNORE INTO tag_posts(tag_id, post_id) VALUES
  ((SELECT tag_id FROM tags WHERE tag_name='tutorial'), 'getting-started-with-sqlite'),
  ((SELECT tag_id FROM tags WHERE tag_name='how-to'), 'getting-started-with-sqlite'),

  ((SELECT tag_id FROM tags WHERE tag_name='personal'), 'personal-reflections'),
  ((SELECT tag_id FROM tags WHERE tag_name='lifestyle'), 'personal-reflections'),
  ((SELECT tag_id FROM tags WHERE tag_name='opinion'), 'personal-reflections'),

  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'advanced-tagging-strategies'),
  ((SELECT tag_id FROM tags WHERE tag_name='how-to'), 'advanced-tagging-strategies'),
  ((SELECT tag_id FROM tags WHERE tag_name='tutorial'), 'advanced-tagging-strategies'),
  ((SELECT tag_id FROM tags WHERE tag_name='news'), 'advanced-tagging-strategies'),

  ((SELECT tag_id FROM tags WHERE tag_name='announcement'), 'site-maintenance-notice'),

  ((SELECT tag_id FROM tags WHERE tag_name='tutorial'), 'tutorial-deploying-with-docker'),
  ((SELECT tag_id FROM tags WHERE tag_name='how-to'), 'tutorial-deploying-with-docker'),
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'tutorial-deploying-with-docker'),

  ((SELECT tag_id FROM tags WHERE tag_name='news'), 'tech-news-roundup'),
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'tech-news-roundup'),

  ((SELECT tag_id FROM tags WHERE tag_name='opinion'), 'opinion-future-of-web-development'),
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 'opinion-future-of-web-development');


COMMIT;

