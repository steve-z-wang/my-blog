---------- Posts ---------- 
-- Create posts table
CREATE TABLE
  IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE, -- Unique slug for the post
    title TEXT NOT NULL,
    published_at INTEGER NOT NULL, -- unix timestamp
    summary TEXT, -- optional summary
    content TEXT NOT NULL
  );

-- Create a secondary index on published_at for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);

CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts (published_at);

---------- Tags ----------
-- Create tags table
CREATE TABLE
  IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_name TEXT NOT NULL UNIQUE
  );

-- Create tag_posts join table
CREATE TABLE
  IF NOT EXISTS tag_posts (
    tag_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    PRIMARY KEY (tag_id, post_id),
    FOREIGN KEY (tag_id) REFERENCES tags (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
  );

-- Create indexes to speed up joins
CREATE INDEX IF NOT EXISTS idx_tag_posts_tag_id ON tag_posts (tag_id);

CREATE INDEX IF NOT EXISTS idx_tag_posts_post_id ON tag_posts (post_id);

---------- Email Subscriptions ----------
-- Create email_subscriptions table
CREATE TABLE
  IF NOT EXISTS email_subscriptions (
    email TEXT PRIMARY KEY,
    subscribed_at INTEGER NOT NULL -- unix timestamp
  );

---------- Comments ----------
-- Create comments table
CREATE TABLE
  IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    parent_id INTEGER,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL, -- unix timestamp
    FOREIGN KEY (post_id) REFERENCES posts (id),
    FOREIGN KEY (parent_id) REFERENCES comments (id)
  );

-- Create indexes to speed up queries
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments (post_id);

CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments (parent_id);