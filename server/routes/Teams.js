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
        member3: null
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

router.get("/findTeamByPasscode", async (req, res) => {
    const passcode = req.query.passcode;
    
    try {
        const sqlStatement = await sequelize.query("SELECT * FROM Teams WHERE passcode = :passcode",
            { 
                replacements: { passcode: passcode}, 
                type: QueryTypes.SELECT
            });
        const teamId = sqlStatement[0].id;
        res.send({teamId});
    }
    catch (error) {
        res.send("Cannot find team");
    }
});

router.put("/usePasscodeToJoinTeam", async (req, res) => {
    const passcode = req.body.passcode;
    const hackerID = req.body.hackerID;
    let sqlStatement = await sequelize.query("SELECT * FROM Teams WHERE passcode = :passcode",
            { 
                replacements: { passcode: passcode}, 
                type: QueryTypes.SELECT
            });
    const mem1 = sqlStatement[0].member1;
    const mem2 = sqlStatement[0].member2;
    const mem3 = sqlStatement[0].member3;
    if (mem1 == null) {
        const sqlUpdate = await sequelize.query("UPDATE `Teams` SET member1 = :member1 WHERE passcode = :passcode", {
            replacements: { member1: hackerID, passcode: passcode},
            type: QueryTypes.UPDATE
        });
    } else if (mem2 == null) {
        const sqlUpdate = await sequelize.query("UPDATE `Teams` SET member2 = :member2 WHERE passcode = :passcode", {
            replacements: { member2: hackerID, passcode: passcode},
            type: QueryTypes.UPDATE
        });
    } else if (mem3 == null) {
        const sqlUpdate = await sequelize.query("UPDATE `Teams` SET member3 = :member3 WHERE passcode = :passcode", {
            replacements: { member3: hackerID, passcode: passcode},
            type: QueryTypes.UPDATE
        });
    } else {
        res.send("Team is full");
    }
    sqlStatement = await sequelize.query("SELECT * FROM Teams WHERE passcode = :passcode",
            { 
                replacements: { passcode: passcode}, 
                type: QueryTypes.SELECT
            });
    res.send(sqlStatement);
})

router.put('/switchLookingForTeamStatus', async (req, res) => {
    const hackerID = req.body.hackerID;
    const lftStatus = req.body.lookingForTeam;
    let sqlStatement = await sequelize.query("UPDATE Hackers SET lookingForTeam = :lft WHERE id = :id", 
        {
            replacements: { lft: lftStatus, id: hackerID },
            type: QueryTypes.UPDATE
        });
        sqlStatement = await sequelize.query("SELECT lookingForTeam FROM Hackers WHERE id = :id",
        { 
            replacements: { id: hackerID }, 
            type: QueryTypes.SELECT
        }); 
    res.send(sqlStatement);
})

router.get('/getLFTStatus', async (req, res) => {
    const hackerID = req.query.hackerID;
    let sqlStatement = await sequelize.query("SELECT lookingForTeam FROM Hackers WHERE id = :id",
        {
            replacements: { id: hackerID },
            type: QueryTypes.SELECT
        }
    );
    res.send(sqlStatement[0]);

})


router.get('/checkAlreadyInTeam', async (req, res) => {
    const hackerID = req.query.hackerID;
    let teamName = "";
    const sqlStatement = await sequelize.query("SELECT DISTINCT teamName FROM Teams WHERE member1 = :m1 OR member2 = :m2 OR member3 = :m3 OR owner = :o",
        {
            replacements: { m1: hackerID, m2: hackerID, m3: hackerID, o: hackerID },
            types: QueryTypes.SELECT
        })
    if (sqlStatement[0].length < 1) {
        teamName = "NONE"
    } else {
        teamName = sqlStatement[0][0].teamName;
    }
    

    if (teamName === "NONE") {
        res.send("NOT YET IN TEAM");
    } else {
        res.send("ALREADY IN TEAM");
    }
})

module.exports = router