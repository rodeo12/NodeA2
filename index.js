const express= require("express");
const mongoose= require("mongoose");
const loggerMiddleware = require('./middleware/loggerMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const usersRouter = require('./routes/user');
require("dotenv").config();

const app= express();
const PORT= process.env.PORT ;


app.use(express.json());
app.use(loggerMiddleware);
app.use(authMiddleware);

app.use('/api/users', usersRouter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connect to DB")
})
.catch((err)=>{
    console.error("Error connection to DB",err)
})



app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})