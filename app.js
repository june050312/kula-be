const express = require("express")
const app = express()

app.use(express.json())

app.use("/api/laundary", require("./routes/laundaryRouter"))
app.use("/api/user", require("./routes/userRouter"))

app.listen(8080, () => {
    console.log("app is listening on port 8080")
})