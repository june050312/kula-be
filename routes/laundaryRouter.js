const express = require('express')
const router = express.Router()
const {
    getLaundaryStatus,
    setLaundaryStatus
} = require("../controllers/laundaryController")



router.get("/:id", getLaundaryStatus)
router.post("/", setLaundaryStatus)



module.exports = router