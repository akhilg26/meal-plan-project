const UserProfile = require('../models/UserProfile')


const getUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findOne({userID: req.params.userId})
        if (!userProfile){
            return res.status(404).json({message: "User profile does not exist"})
        }
        if(userProfile.userID != req.user.id){
            return res.status(403).json({message: "Not authorized"})
        }
        
        return res.status(200).json({userProfile: userProfile, message: "Here ya go!"})
        


    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

const createUserProfile = async (req, res) => {
    try {
        const {age, sex, height, weight, activityLevel, goals, mealsPerDay, cheatMeals, foodPreferences, foodDislikes, dietaryRestrictions, medicalConditions} = req.body
        const protein = req.body.macroSplit?.custom?.protein
    const carbs = req.body.macroSplit?.custom?.carbs
    const fat = req.body.macroSplit?.custom?.fat
        if(protein || carbs || fat){
            if(protein + carbs + fat != 100){
                return res.status(400).json({ message: "Macro split does not add up to 100"})
            }
        }
        const existingUserProfile = await UserProfile.findOne({userID: req.user.id})
        if (existingUserProfile){
            return res.status(400).json({message: "A user profile already exists"})
        }
        const userProfile = await UserProfile.create({
            userID: req.user.id,
            age: age,
            sex: sex, 
            height: height, 
            weight: weight, 
            activityLevel: activityLevel, 
            goals: goals, 
            mealsPerDay: mealsPerDay, 
            cheatMeals: cheatMeals, 
            foodPreferences: foodPreferences, 
            foodDislikes: foodDislikes, 
            dietaryRestrictions: dietaryRestrictions, 
            medicalConditions: medicalConditions,
            macroSplit: req.body.macroSplit
    })
        return res.status(201).json({userProfile: userProfile, message: "here ya go!"})
} catch (error) {
    return res.status(500).json({message: error.message})
}
}

const updateUserProfile = async (req, res) => {
    try{
        if (req.params.userId != req.user.id){
            return res.status(403).json({message: "Not authorized"})
        }
        const newUserProfile = await UserProfile.findOneAndUpdate({
        userID: req.params.userId
    }, req.body, {new: true})
        if (!newUserProfile){
            return res.status(404).json({message: "User Profile does not exist"})
        }
        return res.status(200).json({userProfile: newUserProfile, message: "here ya go !"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}

module.exports = { getUserProfile, createUserProfile, updateUserProfile }