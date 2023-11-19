const express = require('express')
const app = express()
app.use(express.json());
const db = require('./models')


//Routers 
const hackerRouter = require('./routes/Hackers')
app.use("/hackers",hackerRouter);

db.sequelize.sync().then(() => {
    app.listen(5000, () => {console.log("Server started on port 5000")});
});
