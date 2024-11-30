const express = require("express")
const connect = require("./models")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

app.use(express.json())
app.set('view engine', 'ejs') 

app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use("/api/laundary", require("./routes/laundaryRouter"))
app.use("/api/user", require("./routes/userRouter"))

connect()

app.listen(process.env.PORT || 8080, () => {
  console.log("app is listening on port 8080")
})
