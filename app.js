const express = require("express")
const app = express()
const { MongoClient } = require('mongodb')

app.use(express.json())
app.set('view engine', 'ejs') 

app.use("/laundary", require("./routes/laundaryRouter"))
app.use("/user", require("./routes/userRouter"))

let db
let connectDB = require('./utils/database.js')

connectDB.then((client)=>{
  console.log('DB connect')
  db = client.db('kula')

  app.listen(process.env.PORT || 8080, () => {
    console.log("app is listening on port 8080")
})
}).catch((err)=>{
    console.log(err)
})