CREATE TABLE IF NOT EXISTS url_shortener.shorteners (
  short_code text PRIMARY KEY,
  long_url   text,
  created_at timestamp
);