---------- Posts ---------- 

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  post_id INTEGER PRIMARY KEY AUTOINCREMENT,
  publish_at INTEGER NOT NULL, -- unix timestamp
  title TEXT NOT NULL,
  summary TEXT, -- optional summary
  content TEXT NOT NULL
);

-- Create a secondary index on publish_at for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_publish_at ON posts(publish_at);

---------- Tags ----------

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag_name TEXT NOT NULL UNIQUE
);


-- Create tag_posts join table
CREATE TABLE IF NOT EXISTS tag_posts (
  tag_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  PRIMARY KEY (tag_id, post_id),
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

-- Create indexes to speed up joins
CREATE INDEX IF NOT EXISTS idx_tag_posts_tag_id ON tag_posts(tag_id);
CREATE INDEX IF NOT EXISTS idx_tag_posts_post_id ON tag_posts(post_id);

---------- Comments ----------
-- TODO: Create comments table