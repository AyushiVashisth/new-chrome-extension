// Models/Headline.model.js
const mongoose = require("mongoose");

const headlineSchema = new mongoose.Schema({
  originalHeadline: String,
  rhymingHeadline: String,
  biasSummary: String,
  articleLink: String
});

module.exports = mongoose.model("Headline", headlineSchema);
