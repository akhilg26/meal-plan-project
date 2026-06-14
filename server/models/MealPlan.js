const mongoose = require('mongoose')




const groceryItemSchema = mongoose.Schema(
    {
        item: {
            type: String,
            required: true
        },

        amount: {
            type: String,
            required: true
        }
    }
)

const groceryListSchema = mongoose.Schema(
    {
        produce: {
            type: [groceryItemSchema],
            required: true
        },

        proteins: {
            type: [groceryItemSchema],
            required: true
        },

        dairy: {
            type: [groceryItemSchema],
            required: true
        },

        grains: {
            type: [groceryItemSchema],
            required: true
        },

        other: {
            type: [groceryItemSchema],
            required: true
        }
    }
)

const mealSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
            type: Number,
            required: true
        },

    protein: {
            type: Number,
            required: true
        },

    carbs: {
            type: Number,
            required: true
        },

    fat: {
            type: Number,
            required: true
        },
    
    ingredients: {
            type: [String],
            required: true
        },

    prepTime: {
            type: Number,
            required: true
        }
})

const mealsSchema = mongoose.Schema({
    breakfast: {
        type: mealSchema,
        required: true
    },

    morningSnack: {
        type: mealSchema
    },

    lunch: {
        type: mealSchema,
        required: true
    },

    afternoonSnack: {
        type: mealSchema
    },

    dinner: {
        type: mealSchema,
        required: true
    },
})

const daySchema = mongoose.Schema({
    dayName: {
        type: String,
        required: true
    },

    dailyCalories: {
        type: Number,
        required: true
    },

    meals: {
        type: mealsSchema,
        required: true
    }
}
)

const mealPlanSchema = mongoose.Schema(
    {
        userID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
        
        groceryList: {
            type: groceryListSchema,
            required: true
        },
        days: {
            type: [daySchema],
            required: true
        }


    },

    {
        timestamps: true
    }
)

module.exports = mongoose.model('MealPlan', mealPlanSchema)