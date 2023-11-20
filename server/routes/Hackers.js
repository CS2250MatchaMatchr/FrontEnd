const express = require('express')
const router = express.Router()
const { Hackers, sequelize } = require("../models")

router.get("/", async (req,res) =>{
    const listOfPosts = await Hackers.findAll()
    res.json(listOfPosts)
});

router.post("/", async (req,res) => {
    await Hackers.create(hacker)
    res.json(hacker)
});

// make it so that if the email already exists in the database, then it sends an error message
router.post("/", async (req, res) => {
    const inputEmail = req.body.email;
    const dbEmail = await sequelize.query("SELECT email FROM MatchaMatchr.Hackers WHERE email = :email", { replacements: { email: inputEmail}});
    if (inputEmail === dbEmail) {
        res.send("This email already exists.")  ;
        alert("it's already a thing");
    } else {
        await Hackers.create(hacker);
        res.json(hacker);
    }
})


module.exports = router