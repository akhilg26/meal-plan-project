const mongoose = require('mongoose')

const userProfileSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    age: {
        type: Number,
        required: true,
    },

    sex: {
        type: String,
        required: true,
        enum: ['male', 'female', 'prefer not to say']
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    activityLevel: {
        type: String,
        required: true,
        enum: ['sedentary', 'slightly active', 'moderately active', 'very active', 'extremely active']
    },

    goals: {
        type: String,
        required: true,
        enum: ['maintain', 'gain 0.5lbs/week', 'gain 1lb/week', 'gain 1.5lbs/week', 'gain 2lbs/week', 'lose 0.5lbs/week', 'lose 1lb/week', 'lose 1.5lbs/week', 'lose 2lbs/week']
    },

    mealsPerDay: {
        type: Number,
        required: true
    },
    
    cheatMeals: {
        type: Number,
        required: true
    },

    foodPreferences: {
        type: [String]
    },

    foodDislikes: {
        type: [String]
    },

    dietaryRestrictions: {
        type: [String]
    },
    medicalConditions: {
        type: [String]
    },
    macroSplit: {
        preset: {
            type: String,
            enum: ['balanced', 'high protein', 'keto','low carb', 'low fat','high carb']
            
        },
        
        custom: {
            
                protein: { type: Number},
                carbs: { type: Number},
                fat: {type: Number}
            
        }

    }
}

)

module.exports = mongoose.model('UserProfile', userProfileSchema)
