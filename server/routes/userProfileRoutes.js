const express = require("express")
const router = express.Router()
const controller = require("../controllers/userProfileController")


router.get('/:userId', controller.getUserProfile)
router.post('/', controller.createUserProfile)
router.put('/:userId', controller.updateUserProfile)

module.exports = router