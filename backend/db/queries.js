const GET_AUDIOBOOKS = `
SELECT id,
  title,
  author_name,
  category,
  description,
  language,
  cover_url,
  created_at,
  rating_count,
  rating,
  chapter_count,
  total_duration,
  category_rank
FROM view_audiobook WHERE 1=1`;

const GET_AUDIOBOOK_CHAPTERS = `
SELECT id,
  audiobook_id,
  chapter_name,
  duration,
  media_url
FROM chapter WHERE 1=1`;

const GET_AUDIOBOOK_REVIEWS = `
SELECT id,
  audiobook_id,
  full_name,
  avatar,
  review_text,
  rating,
  created_at
FROM review WHERE 1=1`;

const INSERT_REVIEW = `
INSERT INTO review (audiobook_id, full_name, avatar, review_text, rating)
VALUES
($1, $2, $3, $4, $5);
`;

module.exports = {
  GET_AUDIOBOOKS,
  GET_AUDIOBOOK_CHAPTERS,
  GET_AUDIOBOOK_REVIEWS,
  INSERT_REVIEW,
};
