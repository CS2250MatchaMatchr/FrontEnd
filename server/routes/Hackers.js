const express = require('express')
const router = express.Router()
const { Hackers, sequelize } = require("../models")
const { QueryTypes } = require('sequelize');


//Returns a JSON of all Hackers
router.get("/", async (req,res) =>{
    const listOfPosts = await Hackers.findAll()
    res.json(listOfPosts)
});

//Gets hacker's password given email for login authentication
router.get("/getPassword", async (req,res) => {
    const inputEmail = req.query.email;
    const inputPassword = req.query.hackerPassword;
    const sqlStatement = await sequelize.query("SELECT hackerPassword FROM `Hackers` WHERE email = :email" , 
        { 
            replacements: {email: inputEmail},
            type: QueryTypes.SELECT 
        });

    try {
        dbPassword = sqlStatement[0].hackerPassword;
        if (dbPassword != inputPassword){
            res.send("Incorrect Password");
        }
        else{
            res.send(true);
        } 
    } catch (error){
        res.send("Email does not exist");
    }
});

// //Creates a Hacker Object if not in table and makes it so that if the email already exists in the database, then it sends an error message
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