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
  (1, strftime('%s','2025-04-24 12:00:00'), 'Welcome to the Blog', 'This is the inaugural post seeded into the database.'),
  (2, strftime('%s','2025-04-25 09:30:00'), 'Second Thoughts', 'Another seed post to showcase seeding with SQLite.'),
  (3, strftime('%s','2025-04-26 15:45:00'), 'Tagging Demo', 'How to attach tags to posts in SQLite.');

-- Tag‑Post relationships
INSERT OR IGNORE INTO tag_posts(tag_id, post_id) VALUES
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 1),
  ((SELECT tag_id FROM tags WHERE tag_name='personal'), 1),
  ((SELECT tag_id FROM tags WHERE tag_name='tech'), 2),
  ((SELECT tag_id FROM tags WHERE tag_name='tutorial'), 3);

COMMIT;
