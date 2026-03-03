-- NotebookLM Hub D1 Schema

CREATE TABLE IF NOT EXISTS examples (
  id TEXT PRIMARY KEY,
  feature_id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  output TEXT NOT NULL,
  tag TEXT DEFAULT '',
  likes INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS threads (
  id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  reply_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS replies (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (thread_id) REFERENCES threads(id)
);

CREATE TABLE IF NOT EXISTS likes (
  example_id TEXT NOT NULL,
  client_hash TEXT NOT NULL,
  PRIMARY KEY (example_id, client_hash)
);

CREATE INDEX IF NOT EXISTS idx_examples_feature ON examples(feature_id);
CREATE INDEX IF NOT EXISTS idx_replies_thread ON replies(thread_id);
CREATE INDEX IF NOT EXISTS idx_threads_category ON threads(category);
