import axios from 'axios'

async function createMealPlan(token) {
    try {
        const response = await axios.post('http://localhost:8080/api/meal-plans', {}, { 
            headers: {
                Authorization: `Bearer ${token}`
        }})
        return response
    } catch (error) {
        throw error
    }
}

async function getMealPlan(token, userId){
    try {
        const response = await axios.get(`http://localhost:8080/api/meal-plans/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response
    } catch (error) {
        throw error
    }
}

export {createMealPlan, getMealPlan}