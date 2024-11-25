const express = require('express')
const router = express.Router()
const {
    getLaundaryStatus,
    setLaundaryStatus,
    addLaundary
} = require("../controllers/laundaryController")



router.get("/:id", getLaundaryStatus)
router.post("/", setLaundaryStatus)
router.post("/add", addLaundary)



module.exports = router