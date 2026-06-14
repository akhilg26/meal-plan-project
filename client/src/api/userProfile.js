import axios from 'axios'

async function createUserProfile(token, age, sex, height, weight, activityLevel, goals, mealsPerDay, cheatMeals, foodPreferences, foodDislikes, dietaryRestrictions, medicalConditions, macroSplit){
    try {
        const response = await axios.post('http://localhost:8080/api/user-profiles',
            {age: age, sex: sex, height: height, weight: weight, activityLevel: activityLevel, goals: goals, mealsPerDay: mealsPerDay, cheatMeals: cheatMeals, foodPreferences: foodPreferences, foodDislikes: foodDislikes, dietaryRestrictions: dietaryRestrictions, medicalConditions: medicalConditions, macroSplit: macroSplit},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response
    } catch (error) {
        throw error
    }
}

async function getUserProfile(token, userId){
try{
    const response = await axios.get(`http://localhost:8080/api/user-profiles/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
} catch (error) {
    throw error
}
}

async function updateUserProfile(token, userId, updates){
    try{
        const response = await axios.put(`http://localhost:8080/api/user-profiles/${userId}`, updates, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response
    } catch (error) {
        throw error
    }
}

export {getUserProfile, createUserProfile, updateUserProfile}