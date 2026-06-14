const express = require("express")
const router = express.Router()
const controller = require("../controllers/mealPlanController")

router.post("/", controller.createMealPlan)
router.get("/:userId", controller.getMealPlan)

module.exports = router