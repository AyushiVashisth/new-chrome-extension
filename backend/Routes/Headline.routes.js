// Routes/Headline.routes.js
const express = require("express");
const HeadlineModel = require("../Models/Headline.model");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { originalHeadline, rhymingHeadline, biasSummary, articleLink } =
      req.body;

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

router.get("/", async (req, res) => {
  try {
    const headlines = await HeadlineModel.find();

    res.status(200).json(headlines);
  } catch (error) {
    console.error("Error fetching headlines:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
