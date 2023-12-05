//Express
const express = require('express')
const app = express()

//Json format responses
app.use(express.json());

//Database
const db = require('./models')

//Middleware
var cors = require('cors')
app.use(cors())



//Routers 
const hackerRouter = require('./routes/Hackers')
app.use("/hackers", hackerRouter);

const teamRouter = require('./routes/Teams')
app.use("/teams", teamRouter);

const techRouter = require('./routes/Technologies')
app.use("/technologies", techRouter);

const pfpRouter = require('./routes/ProfilePic')
app.use("/pfp", pfpRouter);

const messageRouter = require('./routes/Messages')
app.use("/messages", messageRouter);

//Running the app + db
db.sequelize.sync().then(() => {
    app.listen(5001, () => { console.log("Server started on port 5001") });
});
