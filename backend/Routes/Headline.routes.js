// Routes/Headline.routes.js
const express = require("express");
const HeadlineModel = require("../Models/Headline.model");
const router = express.Router();

// Save changed headlines and bias summaries
router.post("/", async (req, res) => {
  try {
    const { originalHeadline, rhymingHeadline, biasSummary, articleLink } =
      req.body;

    // Save data to MongoDB
    const newHeadline = new HeadlineModel({
      originalHeadline,
      rhymingHeadline,
      biasSummary,
      articleLink
    });

    await newHeadline.save();

    res.status(201).json({ message: "Headline saved successfully" });
  } catch (error) {
    console.error("Error saving headline:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve saved headlines
router.get("/", async (req, res) => {
  try {
    // Fetch all headlines from MongoDB
    const headlines = await HeadlineModel.find();

    res.status(200).json(headlines);
  } catch (error) {
    console.error("Error fetching headlines:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
