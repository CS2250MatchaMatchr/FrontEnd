const express = require('express')
const router = express.Router()
const { Hackers, sequelize } = require("../models")
const { QueryTypes } = require('sequelize');


//Returns a JSON of a hacker given ID
router.get("/", async (req,res) =>{
    const id = req.query.id
    const hacker = await sequelize.query("SELECT * FROM `Hackers` WHERE id = " + id)
    res.json(hacker)
});

//Gets hacker's password for login authentication (email needed)
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
            const hackerID = await sequelize.query("SELECT id FROM `Hackers` WHERE email = :email", 
                { 
                    replacements: { email: inputEmail}, 
                    type: QueryTypes.SELECT
                });
            res.send(String(hackerID[0].id));
        } 
    } catch (error){
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
        replacements: { email: inputEmail}, 
        type: QueryTypes.SELECT
    });
    console.log(sqlStatement);
    try{
        const dbEmail = sqlStatement[0].email;
        res.send("Fail");
        
    } 
    catch (error) {
        await Hackers.create(hacker);
        const hackerID = await sequelize.query("SELECT id FROM `Hackers` WHERE email = :email", 
        { 
            replacements: { email: inputEmail}, 
            type: QueryTypes.SELECT
        });
        res.send(String(hackerID[0].id));
    }
    
    
    
})

//Used to update the second the missing values of Hackers table
router.put("/", async (req, res) => {
    const sqlStatement = await sequelize.query("UPDATE `Hackers` SET fullName = :fullName, classStanding = :classStanding, gender = :gender, school = :school," + 
                                               "frontOrBackEnd = :frontOrBackEnd, github = :github, linkedIn = :linkedIn, biography = :biography, lookingForTeam = :lookingForTeam " +
                                               "WHERE id = :id",

        {
            replacements: { 
                            id: req.body.id,
                            fullName: req.body.fullName,
                            classStanding: req.body.classStanding,
                            gender: req.body.gender,
                            school: req.body.school,
                            frontOrBackEnd: req.body.frontOrBackEnd,
                            github: req.body.github,
                            linkedIn: req.body.linkedIn,
                            biography: req.body.biography,
                            lookingForTeam: req.body.lookingForTeam},
            type: QueryTypes.INSERT
        });
    res.send("Update Succesful")
    

    
})


module.exports = router