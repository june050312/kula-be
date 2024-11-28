const express = require("express")
const connect = require("./models")
const app = express()

app.use(express.json())
app.set('view engine', 'ejs') 

app.use("/laundary", require("./routes/laundaryRouter"))
app.use("/user", require("./routes/userRouter"))

connect()

app.listen(process.env.PORT || 8080, () => {
  console.log("app is listening on port 8080")
})
