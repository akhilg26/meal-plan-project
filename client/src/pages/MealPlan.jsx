import { useState, useEffect } from 'react'
import { createMealPlan, getMealPlan } from '../api/mealPlan'
import './MealPlan.css'
import { useNavigate } from 'react-router'

function MealPlan(){
    const [mealPlan, setMealPlan] = useState(null)
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    async function fetchMealPlan(){
        try {
            const response = await getMealPlan(token, id)
            setMealPlan(response.data.mealPlan)
            setLoading(false)
            console.log(mealPlan.groceryList)
        }
        catch (error) {
            try{
                const response = await createMealPlan(token)
                setMealPlan(response.data)
                setLoading(false)
            } catch(error) {
                console.log(error)
            }
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMealPlan()
    }, [])
    if (loading) return <div>Loading...</div>
    return <div>
        <button onClick={() => navigate('/profile')} style={{marginBottom: '20px', backgroundColor: 'yellow'}}>Customize Profile</button>
        {mealPlan ? (
            <div>
                {mealPlan.days.map((day, index) => (
                    <div key={index} className='day-card'>
                        <h2>{day.dayName}</h2>
                        <p>Daily Calories: {day.dailyCalories}</p>
                        <p>Breakfast: {day.meals.breakfast.name}</p>
                        <p>Calories: {day.meals.breakfast.calories}</p>
                        <p>Protein: {day.meals.breakfast.protein}g</p>
                        <p>Carbs: {day.meals.breakfast.carbs}g</p>
                        <p>Fat: {day.meals.breakfast.fat}g</p>
                        <p>Ingredients: {day.meals.breakfast.ingredients.join(' | ')}</p>
                        <p>Prep Time: {day.meals.breakfast.prepTime} mins</p>
                        <p>Lunch: {day.meals.lunch.name}</p>
                        <p>Calories: {day.meals.lunch.calories}</p>
                        <p>Protein: {day.meals.lunch.protein}g</p>
                        <p>Carbs: {day.meals.lunch.carbs}g</p>
                        <p>Fat: {day.meals.lunch.fat}g</p>
                        <p>Ingredients: {day.meals.lunch.ingredients.join(' | ')}</p>
                        <p>Prep Time: {day.meals.lunch.prepTime} mins</p>
                        <p>Dinner: {day.meals.dinner.name}</p>
                        <p>Calories: {day.meals.dinner.calories}</p>
                        <p>Protein: {day.meals.dinner.protein}g</p>
                        <p>Carbs: {day.meals.dinner.carbs}g</p>
                        <p>Fat: {day.meals.dinner.fat}g</p>
                        <p>Ingredients: {day.meals.dinner.ingredients.join(' | ')}</p>
                        <p>Prep Time: {day.meals.dinner.prepTime} mins</p>
                    </div>
                ))}
                <h2>Grocery List</h2>
<div>{Object.keys(mealPlan.groceryList)
    .filter(category => category !== '_id')
    .map((category) => (
        <div key={category} className='grocery-card'>
            <h3>{category}</h3> 
            <ul>
                {Array.isArray(mealPlan.groceryList[category]) ? 
                    mealPlan.groceryList[category].map((item, index) => (
                        <li key={index}>{item.item} - {item.amount}</li>
                    ))
                : null}
            </ul>
            <br />
        </div>
    ))} </div>
            </div>
        ) : (
            <p>Generating your meal plan</p>
        )}
    </div>
}

export default MealPlan