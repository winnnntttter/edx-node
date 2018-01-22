const port = process.env.PORT || 3000;
const db = process.env.MONGODB_URI || "mongodb://localhost:27017/edx-course-db";

module.exports = {
  port,
  db
};
