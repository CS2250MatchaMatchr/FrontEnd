const express = require('express')
const router = express.Router()
const { Teams, Hackers, sequelize, Technologies } = require("../models")
const { QueryTypes, where } = require('sequelize');

//Creates a new team with owner
router.post("/", async (req, res) => {

    const technology = {
        hackerID: req.body.hackerID,
        Javascript: req.body.Javascript,
        Python: req.body.Python,
        Go: req.body.Go,
        Java: req.body.Java,
        Kotlin: req.body.Kotlin,
        PHP: req.body.PHP,
        CSharp: req.body.CSharp,
        Swift: req.body.Swift,
        R: req.body.R,
        Ruby: req.body.Ruby,
        CPP: req.body.CPP,
        C: req.body.C,
        Matlab: req.body.Matlab,
        Typescript: req.body.Typescript,
        SQL: req.body.SQL,
        Scala: req.body.Scala,
        HTML: req.body.HTML,
        CSS: req.body.CSS,
        NoSQL: req.body.NoSQL,
        Rust: req.body.Rust,
        Perl: req.body.Perl,
        Other: req.body.Other,

    }


    const sqlStatement = await sequelize.query("SELECT hackerID FROM Technologies WHERE hackerID = " + req.body.hackerID)
    console.log(sqlStatement[0].hackerID);
    try {
        const sql = sqlStatement[0].hackerID;
        await Technologies.create(technology);
        res.send("Successfully Created");

    }
    catch {
        res.send("Error: Please Create a different account");
    }

});

//Gets HackerID given language
router.get("/HackerIDFromLanguage", async (req, res) => {
    const language = req.query.language;
    if (language == "SQL") {
        const sqlStatementID = await sequelize.query("SELECT hackerID FROM `Technologies` WHERE :language = 1",
            {
                replacements: { language: language },
                type: QueryTypes.SELECT
            });
        listOfID = []
        for (let hacker in sqlStatementID[0]) {
            console.log(sqlStatementID[0][hacker])
            listOfID.push(sqlStatementID[0][hacker].hackerID)
        }
        res.json({ listOfID })
    }
    else {
        const sqlStatementID = await sequelize.query("SELECT hackerID FROM `Technologies` WHERE " + language + " = 1");
        listOfID = []
        for (let hacker in sqlStatementID[0]) {
            console.log(sqlStatementID[0][hacker])
            listOfID.push(sqlStatementID[0][hacker].hackerID)
        }
        res.json({ listOfID })
    }
});

router.get("/", async (req, res) => {
    const hackerID = req.query.hackerID;
    const sqlStatementID = await sequelize.query("SELECT * FROM Technologies WHERE hackerID = " + hackerID)
    res.send(sqlStatementID)
});

// Update user data based on hackerID
router.put("/:hackerID", async (req, res) => {
    const hackerID = req.params.hackerID; // Extract hackerID from the URL params

    try {
        // Find the existing record by hackerID
        const existingTechnology = await Technologies.findOne({ where: { hackerID } });

        if (existingTechnology) {
            // Update the existing record with the new data
            await existingTechnology.update({
                Javascript: req.body.Javascript,
                Python: req.body.Python,
                // Add other fields you want to update
            });

            res.send("User data updated successfully");
        } else {
            res.status(404).send("User data not found");
        }
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router