const express = require('express')
const router = express.Router()
const { Hackers } = require("../models")

router.get("/", async (req,res) =>{
    const listOfPosts = await Hackers.findAll()
    res.json(listOfPosts)
});

router.post("/", async (req,res) => {
    const hacker = req.body
    await Hackers.create(hacker)
    res.json(hacker)
});


module.exports = router