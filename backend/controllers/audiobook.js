const db = require("../db");
const {
  GET_AUDIOBOOKS,
  GET_AUDIOBOOK_CHAPTERS,
  GET_AUDIOBOOK_REVIEWS,
} = require("../db/queries");
const { isNumber } = require("../utils/isNumber");

const getAudiobooks = async (req, res, next) => {
  try {
    const orderByOptions = {
      highest_rated: "rating desc",
      lowest_rated: "rating",
      newest: "created_at desc",
      oldest: "created_at",
      longest: "total_duration desc",
      shortest: "total_duration",
    };

    const {
      categories,
      languages,
      search,
      category_rank,
      orderBy,
      limit,
      page,
    } = req.query;

    let query = GET_AUDIOBOOKS;
    const queryParams = [];

    if (categories) {
      const categoryArray = categories.split(",");
      query += ` AND (`;
      categoryArray.forEach((category, ind) => {
        queryParams.push(category.toLowerCase());
        query += ` lower(category) = $${queryParams.length}`;
        if (ind === categoryArray.length - 1) {
          query += `)`;
        } else {
          query += ` OR`;
        }
      });
    }

    if (languages) {
      const languageArray = languages.split(",");
      query += ` AND (`;
      languageArray.forEach((language, ind) => {
        queryParams.push(language.toLowerCase());
        query += ` lower(language) = $${queryParams.length}`;
        if (ind === languageArray.length - 1) {
          query += `)`;
        } else {
          query += ` OR`;
        }
      });
    }

    if (search) {
      const searchSegment = `%${search}%`;
      queryParams.push(searchSegment, searchSegment);
      query += ` AND (author_name ILIKE $${
        queryParams.length - 1
      } OR title ILIKE $${queryParams.length})`;
    }

    if (category_rank && isNumber(category_rank)) {
      queryParams.push(Number(category_rank));
      query += ` AND category_rank <= $${queryParams.length}`;
    }

    if (orderBy && orderByOptions[orderBy]) {
      query += ` ORDER BY ${orderByOptions[orderBy]}`;
    }

    if (limit && isNumber(limit)) {
      if (page && isNumber(page)) {
        queryParams.push((Number(page) - 1) * Number(limit));
        query += ` OFFSET $${queryParams.length}`;
      }
      queryParams.push(Number(limit));
      query += ` LIMIT $${queryParams.length}`;
    }

    if (category_rank && isNumber(category_rank)) {
      queryParams.push(Number(category_rank));
      query += ` AND category_rank <= $${queryParams.length}`;
    }

    const result = await db.query(query, queryParams);

    return res.json(result.rows);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

const getSingleAudiobook = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("Id required");
      return next(error);
    }

    const result = {};

    let audiobookQuery = GET_AUDIOBOOKS;
    audiobookQuery += ` AND id = $1`;
    const audiobook = await db.query(audiobookQuery, [id]);
    if (audiobook.rows.length === 1) result.audiobook = audiobook.rows[0];

    let chaptersQuery = GET_AUDIOBOOK_CHAPTERS;
    chaptersQuery += ` AND audiobook_id = $1`;
    const chapters = await db.query(chaptersQuery, [id]);
    if (chapters.rows.length > 0) result.chapters = chapters.rows;

    let reviewsQuery = GET_AUDIOBOOK_REVIEWS;
    reviewsQuery += ` AND audiobook_id = $1 ORDER BY created_at DESC`;
    const reviews = await db.query(reviewsQuery, [id]);
    if (reviews.rows.length > 0) result.reviews = reviews.rows;

    return res.json(result);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

module.exports = { getAudiobooks, getSingleAudiobook };
