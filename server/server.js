const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const { protect } = require('./middleware/authMiddleware')
const mealPlanRoutes = require('./routes/mealPlanRoutes')
const userProfileRoutes = require('./routes/userProfileRoutes')
const rateLimit = require('express-rate-limit')
const mealPlanLimiter = rateLimit({
    windowMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    max: 1, // 1 request per window
    message: { message: 'You can only generate one meal plan per week' },
    skip: (req) => req.method !== 'POST'
})

connectDB()
const app = express()

app.use(cors({
    origin: 'https://meal-plan-project-one.vercel.app'
}))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/meal-plans', protect, mealPlanLimiter, mealPlanRoutes)
app.use('/api/user-profiles', protect, userProfileRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})