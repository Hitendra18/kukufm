const db = require("../db");
const { INSERT_REVIEW } = require("../db/queries");

const postReview = async (req, res, next) => {
  try {
    const { audiobook_id, full_name, review_text, rating } = req.body;
    if (!audiobook_id || !full_name || !review_text || !rating) {
      const error = new Error("All fields are required");
      return next(error);
    }

    const query = INSERT_REVIEW;
    await db.query(query, [
      audiobook_id,
      full_name,
      `https://picsum.photos/400?random=${full_name}`,
      review_text,
      rating,
    ]);

    res.json({ message: "Added review successfully" });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

module.exports = { postReview };
