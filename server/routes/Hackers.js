const express = require('express')
const router = express.Router()
const { Hackers, sequelize } = require("../models")
const { QueryTypes } = require('sequelize');


//Returns a JSON of a hacker given ID
router.get("/", async (req, res) => {
    const id = req.query.id
    const hacker = await sequelize.query("SELECT * FROM `Hackers` WHERE id = " + id)
    res.json(hacker)
});

//Returns a JSON of a hacker given fullName
router.get("/fullName", async (req, res) => {
    const fullName = req.query.fullName
    const hacker = await sequelize.query("SELECT * FROM `Hackers` WHERE fullName = :fullName",
    {
        replacements: { fullName: fullName },
        type: QueryTypes.SELECT
    });
    res.json(hacker)
});

//Returns a JSON of a hacker given fullName given ID
router.get("/fullNameFromID", async (req, res) => {
    const id = req.query.id
    const hacker = await sequelize.query("SELECT * FROM `Hackers` WHERE id = " + id);
    res.json(hacker)
});

//Gets hacker's password for login authentication (email needed)
router.get("/getPassword", async (req, res) => {
    const inputEmail = req.query.email;
    const inputPassword = req.query.hackerPassword;
    const sqlStatement = await sequelize.query("SELECT hackerPassword FROM `Hackers` WHERE email = :email",
        {
            replacements: { email: inputEmail },
            type: QueryTypes.SELECT
        });

    try {
        dbPassword = sqlStatement[0].hackerPassword;
        if (dbPassword != inputPassword) {
            res.send("Incorrect Password");
        }
        else {
            const hackerID = await sequelize.query("SELECT id FROM `Hackers` WHERE email = :email",
                {
                    replacements: { email: inputEmail },
                    type: QueryTypes.SELECT
                });
            res.send(String(hackerID[0].id));
        }
    } catch (error) {
        res.send("Email does not exist");
    }
});

//Creates the hacker object, email and password only
router.post("/", async (req, res) => {
    const inputEmail = req.body.email;
    const hacker = {
        email: inputEmail,
        hackerPassword: req.body.hackerPassword,
        fullName: "",
        classStanding: "",
        gender: "",
        school: "",
        frontOrBackEnd: "",
        github: "",
        linkedIn: "",
        biography: "",
        lookingForTeam: true
    };
    const sqlStatement = await sequelize.query("SELECT DISTINCT email FROM `Hackers` WHERE email = :email",
        {
            replacements: { email: inputEmail },
            type: QueryTypes.SELECT
        });
    console.log(sqlStatement);
    try {
        const dbEmail = sqlStatement[0].email;
        res.send("Fail");
        
    } 
    catch (error) {
        await Hackers.create(hacker);
        res.send("Success");
    }
    
    
    
})


module.exports = router