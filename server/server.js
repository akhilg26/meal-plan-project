const dotenv = require('dotenv')
dotenv.config()
console.log('initial')
const express = require('express')
console.log('express')
const cors = require('cors')
console.log('cors')
const connectDB = require('./config/db')
console.log('connectDB')
const authRoutes = require('./routes/authRoutes')
console.log('authRoutes')
const { protect } = require('./middleware/authMiddleware')
console.log('protect')
const mealPlanRoutes = require('./routes/mealPlanRoutes')
console.log('mealPlanRoutes')
const userProfileRoutes = require('./routes/userProfileRoutes')
console.log('userProfileRoutes')




connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/meal-plans', protect, mealPlanRoutes)
app.use('/api/user-profiles', protect, userProfileRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})