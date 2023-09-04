
const express=require('express');
const app=express();
const mongoose=require('mongoose')
require('dotenv').config();
const todoroutes=require('./routes/todos')
const userRoutes = require('./routes/user')

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.method,req.path);
    next()
})
app.use('/api/todolist',todoroutes);
app.use('/api/user', userRoutes)


// connect to db
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 