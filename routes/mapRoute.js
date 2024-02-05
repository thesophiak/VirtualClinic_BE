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
    let limitedResults = await response.data.results.slice(0, 5);

    limitedResults.map( async (result,i) => {
    
      const responseWithLink = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
          place_id: result["place_id"],
          key: process.env.MAP_KEY
        }
        
      })
      limitedResults[i] = {...result, url:responseWithLink.data.result.url}
      // console.log(i , limitedResults[i])
    })
    
    console.log("response:", limitedResults)
    res.json({results: limitedResults });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// ...response.data, 
module.exports = router;
