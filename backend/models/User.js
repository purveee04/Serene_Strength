import mongoose from 'mongoose';
const dailyGoalSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  workout: {
    selectedWorkouts: [String],
    timeGoal: { type: Number, default: 0 },
    progress: { type: Number, default: 0 },
  },

  yogaMeditation: {
    yoga: [String],
    meditation: [String],
    progress: { type: Number, default: 0 },
    timer: { type: Number, default: 0 },
  },

  nutrition: {
    waterGoal: { type: Number, default: 0 },
    waterProgress: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    proteins: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
    mealDiary: [String],
  },
   favourites: [String],

  weeklyGoals: {
    goalType: { type: String, default: "" },
    goalValue: { type: String, default: "" },
  },

  activityCalendar: {
    completedDates: [String],
  }
});

const weeklyGoalSchema = new mongoose.Schema({
  weekStart: { type: Date },
  goalDescription: { type: String },
  progress: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true, },
  password: { type: String, required: true },
  
 // --- New fields for Profile Page ---
  avatarUrl: { type: String, default: "" },

  // workout: {
  //   selectedWorkouts: [String],
  //   timeGoal: { type: Number, default: 0 },
  //   progress: { type: Number, default: 0 },
  // },

  // AI assistant and personalization data
   // 🧠 Unified preferences section
  preferences: {
    interests: [String],                        // User’s main interests
    theme: { type: String, default: 'light' },  // App theme
    notificationsEnabled: { type: Boolean, default: true },
    language: { type: String, default: 'en' },  // Assistant language
    aiTone: { type: String, default: 'friendly' } // AI personality
  },
  chatHistory: [
    {
      message: String,
      response: String,
      sender: { type: String, enum: ['user', 'assistant'] },
      timestamp: { type: Date, default: Date.now }
    }
  ],
// 🧩 Long-term user traits (custom interests or learning patterns)
  traits: {
    topicsOfInterest: [String],
    difficultyLevel: { type: String, default: "normal" }, // e.g., easy/medium/hard
    lastActive: { type: Date, default: Date.now },
  },
  aiInsights: {
    goalsSuggested: [String],
    recommendations: [String]
  },
  // Profile data
  name: String,
  avatarUrl: String,

  // Daily data
  daily: {
    waterGoal: { type: Number, default: 8 },
    waterDrank: { type: Number, default: 0 },
    macros: {
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fats: { type: Number, default: 0 },
    },
  },

  // Weekly goals
  weekly: {
    workouts: { type: Number, default: 0 },
    meditation: { type: Number, default: 0 },
  },

  // Favorites
  favorites: [{ type: String }],

  // Activity map
  activity: {
    type: Map,
    of: Number, // e.g., { "2025-11-04": 45 }
    default: {},
  },
  // Progress tracking
  weeklyGoals: [weeklyGoalSchema],
  dailyGoals: [dailyGoalSchema],

  totalTimeSpent: { type: Number, default: 0 } // minutes
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User; 
