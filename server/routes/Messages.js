const express = require('express')
const router = express.Router()
const { Teams, Hackers, sequelize, Technologies, ProfilePic, Messages } = require("../models")
const { QueryTypes, where } = require('sequelize');

//Creates a new message
router.post("/", async (req, res) => {
    try{
        const receiver = req.body.receiver
        const sender = req.body.sender
        const message = req.body.message

        const NewMessage = {
            receiver: receiver,
            sender: sender,
            message: message
        }
        await Messages.create(NewMessage);
        res.send("Message Created Succesfully");
    } catch (error){
        res.send("Error")
    }
});

//Returns all Messages as sender
router.get("/received", async (req, res) => {
    try{
        const receiver = req.query.receiver
        const list =await sequelize.query("SELECT * FROM Messages WHERE receiver = " + receiver + " ORDER BY createdAt DESC")
        res.send(list);
    } catch (error){
        res.send("Error")
    }
});

//Returns all Messages as sender
router.get("/sent", async (req, res) => {
    try{
        const sender = req.query.sender

        const list =await sequelize.query("SELECT * FROM Messages WHERE sender = " + sender + " ORDER BY createdAt DESC")
        res.send(list);
    } catch (error){
        res.send("Error")
    }
});


module.exports = router