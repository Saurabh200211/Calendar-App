const mongoose = require('mongoose');
const Goal = require('./models/Goal');
const Task = require('./models/Task');
const Event = require('./models/Event');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/calendar-app')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample data
const goals = [
  {
    name: 'Be fit',
    color: '#e67e22'
  },
  {
    name: 'Academics',
    color: '#3498db'
  },
  {
    name: 'LEARN',
    color: '#9b59b6'
  },
  {
    name: 'Sports',
    color: '#2ecc71'
  }
];

// Clear existing data and seed new data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Goal.deleteMany({});
    await Task.deleteMany({});
    await Event.deleteMany({});

    console.log('Cleared existing data');

    // Insert goals
    const createdGoals = await Goal.insertMany(goals);
    console.log('Goals seeded successfully');

    // Create tasks for each goal
    const tasks = [
      // Tasks for "Be fit"
      { name: 'Morning Run', goalId: createdGoals[0]._id },
      { name: 'Gym Workout', goalId: createdGoals[0]._id },
      
      // Tasks for "Academics"
      { name: 'Study Math', goalId: createdGoals[1]._id },
      { name: 'Research Paper', goalId: createdGoals[1]._id },
      
      // Tasks for "LEARN"
      { name: 'AI based agents', goalId: createdGoals[2]._id },
      { name: 'MLE', goalId: createdGoals[2]._id },
      { name: 'DE related', goalId: createdGoals[2]._id },
      { name: 'Basics', goalId: createdGoals[2]._id },
      
      // Tasks for "Sports"
      { name: 'Basketball Practice', goalId: createdGoals[3]._id },
      { name: 'Swimming', goalId: createdGoals[3]._id }
    ];

    const createdTasks = await Task.insertMany(tasks);
    console.log('Tasks seeded successfully');

    // Create exact dates for the reference image (21-26)
    // This creates a week starting with Sunday the 21st
    const baseDate = new Date(2025, 3, 21); // April 21, 2025 (Sunday)
    
    const events = [
      // Monday (22) events
      {
        title: 'Monday Wake-Up Hour',
        category: 'exercise',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 8, 0), // Monday 8:00 AM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 8, 30),
      },
      {
        title: 'All-Team Kickoff',
        category: 'work',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 9, 0), // Monday 9:00 AM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 9, 30),
      },
      {
        title: 'Financial Update',
        category: 'work',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 10, 0), // Monday 10:00 AM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 10, 30),
      },
      {
        title: 'Design Review',
        category: 'work',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 13, 0), // Monday 1:00 PM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 13, 30),
      },
      {
        title: '1:1 with Jon',
        category: 'work',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 14, 0), // Monday 2:00 PM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 14, 30),
      },
      
      // Tuesday (23) events
      {
        title: 'Design Webinar',
        category: 'work',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 2, 9, 0), // Tuesday 9:00 AM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 2, 9, 30),
      },
      {
        title: 'New Employee Welcome Lunch',
        category: 'eating',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 2, 11, 0), // Tuesday 11:00 AM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 2, 11, 30),
      },
      {
        title: 'Design System Kickoff Lunch',
        category: 'eating',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 2, 12, 0), // Tuesday 12:00 PM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 2, 12, 30),
      },
      {
        title: 'Concept Design Review II',
        category: 'work',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 2, 14, 0), // Tuesday 2:00 PM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 2, 14, 30),
      },
      {
        title: 'Design Team Happy Hour',
        category: 'social',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 2, 16, 0), // Tuesday 4:00 PM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 2, 16, 30),
      },
      
      // Wednesday (24) events
      {
        title: 'Coffee Chat',
        category: 'social',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 3, 9, 0), // Wednesday 9:00 AM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 3, 9, 30),
      },
      {
        title: 'Onboarding Presentation',
        category: 'work',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 3, 11, 0), // Wednesday 11:00 AM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 3, 11, 30),
      },
      {
        title: 'MVP Prioritization Workshop',
        category: 'work',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 3, 13, 0), // Wednesday 1:00 PM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 3, 13, 30),
      },
      
      // Thursday (25) events
      {
        title: 'Health Benefits Walkthrough',
        category: 'relax',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 4, 10, 30), // Thursday 10:30 AM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 4, 11, 0),
      },
      {
        title: 'Design Review',
        category: 'work',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 4, 13, 0), // Thursday 1:00 PM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 4, 13, 30),
      },
      {
        title: '1:1 with Team',
        category: 'work',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 4, 14, 0), // Thursday 2:00 PM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 4, 14, 30),
      },
      
      // Friday (26) events
      {
        title: 'Coffee Chat',
        category: 'social',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 5, 9, 0), // Friday 9:00 AM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 5, 9, 30),
      },
      {
        title: 'Meetup',
        category: 'social',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 5, 12, 0), // Friday 12:00 PM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 5, 12, 30),
      },
      {
        title: 'Happy Hour',
        category: 'social',
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 5, 16, 0), // Friday 4:00 PM
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 5, 16, 30),
      }
    ];

    await Event.insertMany(events);
    console.log('Events seeded successfully');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
