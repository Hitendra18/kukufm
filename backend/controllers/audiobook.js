const db = require("../db");
const {
  GET_AUDIOBOOKS,
  GET_AUDIOBOOK_CHAPTERS,
  GET_AUDIOBOOK_REVIEWS,
} = require("../db/queries");
const { isNumber } = require("../utils/isNumber");

const getAudiobooks = async (req, res, next) => {
  try {
    // options that that can be used to order data
    const orderByOptions = {
      highest_rated: "rating desc",
      lowest_rated: "rating",
      newest: "created_at desc",
      oldest: "created_at",
      longest: "total_duration desc",
      shortest: "total_duration",
    };

    // extract query string parameters
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

    // filter out categories
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

    // filter out languages
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

    // filter out search parameters
    if (search) {
      const searchSegment = `%${search}%`;
      queryParams.push(searchSegment, searchSegment);
      query += ` AND (author_name ILIKE $${
        queryParams.length - 1
      } OR title ILIKE $${queryParams.length})`;
    }

    // filter out based on category rank
    if (category_rank && isNumber(category_rank)) {
      queryParams.push(Number(category_rank));
      query += ` AND category_rank <= $${queryParams.length}`;
    }

    // order the data
    if (orderBy && orderByOptions[orderBy]) {
      query += ` ORDER BY ${orderByOptions[orderBy]}`;
    }

    // limit the data rows
    if (limit && isNumber(limit)) {
      if (page && isNumber(page)) {
        queryParams.push((Number(page) - 1) * Number(limit));
        query += ` OFFSET $${queryParams.length}`;
      }
      queryParams.push(Number(limit));
      query += ` LIMIT $${queryParams.length}`;
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

    // check if id is provided
    if (!id) {
      const error = new Error("Id required");
      return next(error);
    }

    const result = {};

    // fetch the audiobook
    let audiobookQuery = GET_AUDIOBOOKS;
    audiobookQuery += ` AND id = $1`;
    const audiobook = await db.query(audiobookQuery, [id]);
    if (audiobook.rows.length === 1) result.audiobook = audiobook.rows[0];

    // fet all of the chapters
    let chaptersQuery = GET_AUDIOBOOK_CHAPTERS;
    chaptersQuery += ` AND audiobook_id = $1`;
    const chapters = await db.query(chaptersQuery, [id]);
    if (chapters.rows.length > 0) result.chapters = chapters.rows;

    // fetch all of the reviews
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
