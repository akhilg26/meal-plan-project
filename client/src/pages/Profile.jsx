import { useState } from 'react'
import { createUserProfile } from '../api/userProfile'
import { useNavigate } from 'react-router-dom'

function Profile(){
    const [age, setAge] = useState('')
    const [sex, setSex] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [activityLevel, setActivityLevel] = useState('')
    const [goals, setGoals] = useState('')
    const [mealsPerDay, setMealsPerDay] = useState('')
    const [cheatMeals, setCheatMeals] = useState('')
    const [foodPreference, setFoodPreference] = useState('')
    const [foodPreferences, setFoodPreferences] = useState([])
    const [foodDislike, setFoodDislike] = useState('')
    const [foodDislikes, setFoodDislikes] = useState([])
    const [dietaryRestriction, setDietaryRestriction] = useState('')
    const [dietaryRestrictions, setDietaryRestrictions] = useState([])
    const [medicalCondition, setMedicalCondition] = useState('')
    const [medicalConditions, setMedicalConditions] = useState([])
    const [macroMode, setMacroMode] = useState('')
    const [macroPreset, setMacroPreset] = useState('')
    const [protein, setProtein] = useState('')
    const [carbs, setCarbs] = useState('')
    const [fats, setFats] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const macroSplit = macroMode === 'preset'
            ? {preset: macroPreset}
            : { custom: { protein: Number(protein), carbs: Number(carbs), fat: Number(fats)}}
            const response = await createUserProfile(token, Number(age), sex, Number(height), Number(weight), activityLevel, goals, Number(mealsPerDay), Number(cheatMeals), foodPreferences, foodDislikes, dietaryRestrictions, medicalConditions, macroSplit)
            navigate('/meal-plan')
        }
        catch(error) {
            console.log(error)
        }
    }
    
    function addFoodPreference(){
        setFoodPreferences([...foodPreferences, foodPreference])
        setFoodPreference('')
    }

    function addFoodDislike(){
        setFoodDislikes([...foodDislikes, foodDislike])
        setFoodDislike('')
    }

    function addDietaryRestriction(){
        setDietaryRestrictions([...dietaryRestrictions, dietaryRestriction])
        setDietaryRestriction('')
    }

    function addMedicalCondition(){
        setMedicalConditions([...medicalConditions, medicalCondition])
        setMedicalCondition('')
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <input type="number" id="age" name="age" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}></input> <br/>
            <select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer not to say">Prefer not to say</option>
            </select> <br />
            <input type="number" id="height" name="height" placeholder="Height (in)" value={height} onChange={(e) => setHeight(e.target.value)}></input> <br/>
            <input type="number" id="weight" name="weight" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)}></input> <br/>
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                <option value="">Select Activity Level</option>
                <option value="sedentary">Sedentary</option>
                <option value="slightly active">Slightly active</option>
                <option value="moderately active">Moderately active</option>
                <option value="very active">Very active</option>
                <option value="extremely active">Extremely active</option>
            </select> <br />
            <select value={goals} onChange={(e) => setGoals(e.target.value)}>
                <option value="">Select Goal</option>
                <option value="maintain">Maintain</option>
                <option value="gain 0.5lbs/week">gain 0.5lbs/week</option>
                <option value="gain 1lb/week">Gain 1.0lb/week</option>
                <option value="gain 1.5lbs/week">Gain 1.5lbs/week</option>
                <option value="gain 2lbs/week">Gain 2.0lbs/week</option>
                <option value="lose 0.5lbs/week">Lose 0.5lbs/week</option>
                <option value="lose 1lb/week">Lose 1.0lb/week</option>
                <option value="lose 1.5lbs/week">Lose 1.5lbs/week</option>
                <option value="lose 2lbs/week">Lose 2.0lbs/week</option>
            </select> <br />
            <input type="number" id="mealsPerDay" name="mealsPerDay" placeholder="Meals per day" value={mealsPerDay} onChange={(e) => setMealsPerDay(e.target.value)}></input> <br/>
            <input type="number" id="cheatMeals" name="cheatMeals" placeholder="Cheat Meals per week" value={cheatMeals} onChange={(e) => setCheatMeals(e.target.value)}></input> <br/>
            <input type="text" id="foodPreferences" name="foodPreferences" placeholder="Add food preferences" value={foodPreference} onChange={(e) => setFoodPreference(e.target.value)}></input> <br/>
            
            <button onClick={addFoodPreference} style={{margin: '10px'}}>Add</button>
            {foodPreferences.map((item, index) => (
            <p key={index}>{item}</p>
            ))} <br />
            <input type="text" id="foodDislikes" name="foodDislikes" placeholder="Add food dislikes" value={foodDislike} onChange={(e) => setFoodDislike(e.target.value)}></input> <br/>
            <button type="button" onClick={addFoodDislike} style={{margin: '10px'}}>Add</button>
            {foodDislikes.map((item, index) => (
            <p key={index}>{item}</p>
            ))} <br />
            <input type="text" id="dietaryRestrictions" name="dietaryRestrictions" placeholder="Add dietary restrictions" value={dietaryRestriction} onChange={(e) => setDietaryRestriction(e.target.value)}></input> <br/>
            <button type="button" onClick={addDietaryRestriction} style={{margin: '10px'}}>Add</button>
            {dietaryRestrictions.map((item, index) => (
            <p key={index}>{item}</p>
            ))} <br />
            <input type="text" id="medicalConditions" name="medicalConditions" placeholder="Add medical conditions" value={medicalCondition} onChange={(e) => setMedicalCondition(e.target.value)}></input> <br/>
            <button type="button" onClick={addMedicalCondition} style={{margin: '10px'}}>Add</button>
            {medicalConditions.map((item, index) => (
            <p key={index}>{item}</p>
            ))} <br />
            <button type="button" onClick={() => setMacroMode('preset')} style={{margin: '20px'}}>Preset macro split</button>
            <button type="button" onClick={() => setMacroMode('custom')} style={{margin: '20px'}}>Custom macro split</button>
            {macroMode == 'preset' ? (
                <select value={macroPreset} onChange={(e) => setMacroPreset(e.target.value)}>
                    <option value="">Select Macro Split</option>
                    <option value="balanced">Balanced</option>
                    <option value="high protein">High Protein</option>
                    <option value="keto">Keto</option>
                    <option value="low carb">Low Carb</option>
                    <option value="low fat">Low Fat</option>
                    <option value="high carb">High Carb</option>
                </select>
                
            ) : macroMode === 'custom' ? (
                <div>
                    <input type="number" id="protein" name="protein" placeholder="Protein" value={protein} onChange={(e) => setProtein(e.target.value)}></input> <br/>
                    <input type="number" id="carbs" name="carbs" placeholder="Carbs" value={carbs} onChange={(e) => setCarbs(e.target.value)}></input> <br/>
                    <input type="number" id="fats" name="fats" placeholder="Fats" value={fats} onChange={(e) => setFats(e.target.value)}></input> <br/>
                </div>
            ) : (
                <p>Select a macro split option above</p>
            )
        
        }
            <button type="submit">Submit</button>
            </form>
            
        </div>
}
export default Profile