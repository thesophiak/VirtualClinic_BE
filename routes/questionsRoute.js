const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const knexInstance = knex(knexConfig);

// GET HISTORY LIST
router.get("/", async (req, res) => {
  try {
    const historyList = await knexInstance
      .select("id", "history")
      .from("clinic");
    res.json(historyList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET 1 HISTORY ITEM
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const historyItem = await knexInstance("clinic").where({ id }).first();
    if (historyItem) {
      res.json(historyItem);
    } else {
      res.status(404).json({ message: "History item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST NEW ENTRY
router.post("/", async (req, res) => {
  try {
    const { question, history, answer } = req.body;
    const result = await knexInstance("clinic").insert({
      question,
      history,
      answer,
    });

    const newDataEntryId = result[0];
    const createDataEntry = await knexInstance("clinic").where({
      id: newDataEntryId,
    });

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE everything
router.route("/").delete(async (req, res) => {
  try {
    await knexInstance("clinic").del();
    res.status(200).json({ message: "History cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// DELETE 1 item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCount = await knexInstance("clinic").where({ id }).del();

    if (deleteCount > 0) {
      res
        .status(200)
        .json({ message: `History item with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: "History item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
