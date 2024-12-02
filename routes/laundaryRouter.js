const express = require('express')
const router = express.Router()
const {
    getLaundaryStatus,
    setLaundaryStatus,
    addLaundary,
    searchLaundary,
    getLaundaryByShop
} = require("../controllers/laundaryController")



router.get("/:id", getLaundaryStatus)
router.put("/", setLaundaryStatus)
router.post("/add", addLaundary)
router.post("/search", searchLaundary)
router.get("/shop/:shop", getLaundaryByShop )


module.exports = router