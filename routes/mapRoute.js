const express = require("express");
const router = express.Router();
const axios = require('axios');

const knex = require("knex");
const knexConfig = require("../knexfile.js");
const knexInstance = knex(knexConfig);

// console.log("key", process.env.MAP_KEY)

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

    let limitedResults = response.data.results.slice(0, 6);

    let detailedResults = await Promise.all(limitedResults.map(async result => {
      let detailResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
          place_id: result.place_id,
          key: process.env.MAP_KEY
        }
      });
      return { ...result, detail: detailResponse.data.result };
    }));
    console.log("results for FE: ", detailedResults)
    res.json({ results: detailedResults });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
