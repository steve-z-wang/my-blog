---------- Posts ---------- 

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  post_id TEXT PRIMARY KEY, -- Changed to TEXT for string IDs
  published_at INTEGER NOT NULL, -- unix timestamp
  title TEXT NOT NULL,
  summary TEXT, -- optional summary
  content TEXT NOT NULL
);

-- Create a secondary index on published_at for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at);

---------- Tags ----------

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag_name TEXT NOT NULL UNIQUE
);

-- Create tag_posts join table
CREATE TABLE IF NOT EXISTS tag_posts (
  tag_id INTEGER NOT NULL,
  post_id TEXT NOT NULL,
  PRIMARY KEY (tag_id, post_id),
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

-- Create indexes to speed up joins
CREATE INDEX IF NOT EXISTS idx_tag_posts_tag_id ON tag_posts(tag_id);
CREATE INDEX IF NOT EXISTS idx_tag_posts_post_id ON tag_posts(post_id);


---------- Email Subscriptions ----------

-- Create email_subscriptions table
CREATE TABLE IF NOT EXISTS email_subscriptions (
  email TEXT PRIMARY KEY,
  subscribed_at INTEGER NOT NULL -- unix timestamp
);

---------- Comments ----------
-- TODO: Create comments table