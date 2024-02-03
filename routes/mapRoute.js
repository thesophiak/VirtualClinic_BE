const express = require("express");
const router = express.Router();
const axios = require('axios');

const knex = require("knex");
const knexConfig = require("../knexfile.js");
const knexInstance = knex(knexConfig);

console.log("key", process.env.MAP_KEY)

// MAP API
router.get("/", async (req, res)=>{
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        keyword: 'doctor',
        location: req.query.location,
        radius: 1500,
        type: 'doctor',
        key: process.env.MAP_KEY
      }
    });
    console.log("response:", response.data)
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});


module.exports = router;
