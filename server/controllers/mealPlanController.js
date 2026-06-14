const MealPlan = require("../models/MealPlan")
const UserProfile = require("../models/UserProfile")
const Anthropic = require('@anthropic-ai/sdk')
const client = new Anthropic(
    {
        apiKey: process.env.ANTHROPIC_API_KEY
    }
)
console.log('API KEY:', process.env.ANTHROPIC_API_KEY)


const createMealPlan = async (req, res) => {
    try{
        const userProfile = await UserProfile.findOne({userID: req.user.id})
        if(!userProfile){
            return res.status(404).json({message: "User profile does not exist, must be created before meal plan can be created"})
        }
        const macroInstruction = userProfile.macroSplit?.custom?.protein
  ? `Custom macro split — protein: ${userProfile.macroSplit.custom.protein}%, carbs: ${userProfile.macroSplit.custom.carbs}%, fat: ${userProfile.macroSplit.custom.fat}%`
  : userProfile.macroSplit?.preset
  ? `Macro preset: ${userProfile.macroSplit.preset}`
  : `No macro preference specified, use a balanced split appropriate for the user's goal`
        const prompt = `
CRITICAL: Your response must contain ONLY the raw JSON object. Do not write anything before it, do not write anything after it. Do not wrap it in markdown code blocks or backticks. The very first character of your response must be { and the very last must be }.

You are a professional meal planning assistant and nutritionist. Given the user profile below, you must:

1. Calculate the user's TDEE using the Mifflin-St Jeor equation based on their age, sex, height, and weight, adjusted for activity level.
2. Adjust calories based on their goal (e.g. lose 1lb/week = 500 kcal deficit per day).
3. Generate a 7-day meal plan with completely unique meals — no meal should be repeated across the 7 days.
4. Vary the cuisines and cooking styles throughout the week to keep it interesting.
5. Distribute cheat meals naturally across the week.
6. Respect all meal counts, food preferences, and dietary restrictions.

DIETARY RESTRICTIONS ARE ABSOLUTE AND NON-NEGOTIABLE.
The user's dietary restrictions are: ${userProfile.dietaryRestrictions}
Zero exceptions across all 7 days. Before writing your JSON, mentally audit every single meal.

MEAL KEYS: For mealsPerDay = ${userProfile.mealsPerDay}, use exactly these keys:
- 3 meals: breakfast, lunch, dinner
- 4 meals: breakfast, snack, lunch, dinner
- 5 meals: breakfast, morningSnack, lunch, afternoonSnack, dinner

JSON RULES:
- Use only standard ASCII commas, not fullwidth variants
- Every opening brace and bracket must have a matching close
- No trailing commas anywhere

Use this exact JSON structure:
{
  "days": [
    {
      "dayName": "Monday",
      "dailyCalories": 1850,
      "meals": {
        "breakfast": {
          "name": "string",
          "calories": 400,
          "protein": 30,
          "carbs": 45,
          "fat": 10,
          "ingredients": ["string"],
          "prepTime": 10
        }
      }
    }
  ],
  "groceryList": {
    "produce": [{ "item": "string", "amount": "string" }],
    "proteins": [{ "item": "string", "amount": "string" }],
    "dairy": [{ "item": "string", "amount": "string" }],
    "grains": [{ "item": "string", "amount": "string" }],
    "other": [{ "item": "string", "amount": "string" }]
  }
}

USER PROFILE:
- Age: ${userProfile.age} | Sex: ${userProfile.sex}
- Height: ${userProfile.height} | Weight: ${userProfile.weight}
- Activity level: ${userProfile.activityLevel}
- Goal: ${userProfile.goals}
- Meals per day: ${userProfile.mealsPerDay}
- Cheat meals this week: ${userProfile.cheatMeals}
- Food preferences: ${userProfile.foodPreferences.join(', ') || 'none'}
- Food dislikes: ${userProfile.foodDislikes.join(', ') || 'none'}
- Dietary restrictions: ${userProfile.dietaryRestrictions.join(', ') || 'none'}
- Medical conditions: ${userProfile.medicalConditions.join(', ') || 'none'}
- Macro Split: ${macroInstruction}

FINAL CHECK: Confirm every meal across all 7 days respects the dietary restrictions. Then output the JSON. The very first character must be { and the very last must be }.
`

const message = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 8000,
    messages: [
        {
            role: 'user',
            content: prompt
        }
    ]
})

const rawText = message.content[0].text // accessing the meal plan from an Claude's output array
const cleaned = rawText.replace(/```json\n?|```/g, '').trim()
const mealPlanData = JSON.parse(cleaned) // parsing the json
const mealPlan = new MealPlan({
    userID: req.user.id,
    days: mealPlanData.days,
    groceryList: mealPlanData.groceryList
}
)

await mealPlan.save()

return res.status(201).json(mealPlan)

// 1. Take userProfile data and build a prompt
// 2. Send that prompt to the Claude API
// 3. Parse Claude's JSON response
// 4. Save it to the MealPlan model
// 5. Return it to the frontend
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getMealPlan = async (req, res) => {
    try{
        if(req.params.userId != req.user.id){
            return res.status(403).json({message: "Access not authorized"})
        }
        const mealPlan = await MealPlan.findOne({userID: req.user.id})
        if(!mealPlan){
            return res.status(404).json({message: "Meal plan does not exist"})
        }

        return res.status(200).json({mealPlan: mealPlan, message: "here ya go!"})


    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = { createMealPlan, getMealPlan }