const express = require('express')
const router = express.Router()
const { Teams, Hackers, sequelize } = require("../models")
const { QueryTypes } = require('sequelize');

//Creates a new team with owner
router.post("/", async (req, res) => {
    const team = {
        teamName: req.body.teamName,
        owner: req.body.owner,
        member1: null,
        member2: null,
        member3: null,
        passcode: req.body.passcode
    }

    const sqlStatement1 =  await sequelize.query("SELECT DISTINCT teamName FROM `Teams` WHERE teamName = :teamName", 
    { 
        replacements: { teamName: req.body.teamName}, 
        type: QueryTypes.SELECT
    });

    try{
        if (sqlStatement1[0].teamName == req.body.teamName){
            res.send("Error: Team Name Already Exists")
        }
    }catch (error){
        const sqlStatement2 =  await sequelize.query("SELECT member1 FROM `Teams` WHERE member1 = :owner", 
        { 
            replacements: { owner: req.body.owner}, 
            type: QueryTypes.SELECT
        });
        const sqlStatement3 =  await sequelize.query("SELECT member2 FROM `Teams` WHERE member2 = :owner", 
        { 
            replacements: { owner: req.body.owner}, 
            type: QueryTypes.SELECT
        });
        const sqlStatement4 =  await sequelize.query("SELECT member3 FROM `Teams` WHERE member3 = :owner", 
        { 
            replacements: { owner: req.body.owner}, 
            type: QueryTypes.SELECT
        });
        const sqlStatement5 =  await sequelize.query("SELECT owner FROM `Teams` WHERE owner = :owner", 
        { 
            replacements: { owner: req.body.owner}, 
            type: QueryTypes.SELECT
        });
        
        try{
            sqlStatement2[0].member1
            res.send("You can not create an account whilst a member of a team")
        } catch (error){
            try{
                sqlStatement3[0].member1
                res.send("You can not create an account whilst a member of a team")
            } catch (error){
                try{
                    sqlStatement4[0].member1
                    res.send("You can not create an account whilst a member of a team")
                } catch (error){
                    try{
                        sqlStatement5[0].member1
                        res.send("You can not create an account whilst a member of a team")
                    } catch (error){
                        await Teams.create(team);
                        await sequelize.query("UPDATE Hackers SET lookingForTeam = false WHERE id = " + req.body.owner);
                        res.send("Team created");
                    }
                }
            }
        }
    }
});

//Returns all columns 
router.get("/fromUserID", async (req, res) => {
    const hackerID = req.query.ID
    try{
        const sqlStatement = await sequelize.query("SELECT * FROM Teams WHERE member1 = :hackerID OR owner = :hackerID OR member2 = :hackerID OR member3 = :hackerID", 
        { 
            replacements: { hackerID: hackerID}, 
            type: QueryTypes.SELECT
        });
        res.send(sqlStatement)
    } catch{
        res.send("Error")
    }
    
});

module.exports = router