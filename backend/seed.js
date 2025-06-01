// File: backend/seed.js
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Calculation = require('./models/Calculation');

const seed = async () => {
  const mongoUri = process.env.MONGO_URI_LOCAL || process.env.MONGO_URI_ATLAS;
  await mongoose.connect(mongoUri);
  console.log('✅ Connected to MongoDB');

  await User.deleteMany();
  await Calculation.deleteMany();

  const usersData = [
    { username: 'alice', password: 'test123', role: 'user' },
    { username: 'bob', password: 'test123', role: 'user' },
    { username: 'admin', password: 'admin123', role: 'admin' },
  ];

  const users = [];

  for (const data of usersData) {
    const user = new User({ username: data.username, role: data.role });
    await user.setPassword(data.password); // Assumes setPassword() hashes & sets password field
    await user.save();
    users.push(user);
  }

  await Calculation.insertMany([
    {
      user: users[0]._id,
      input: { age: 55, creatinine: 1.2, sex: 'female'},
      result: 92,
    },
    {
      user: users[1]._id,
      input: { age: 60, creatinine: 1.5, sex: 'male'},
      result: 80,
    },
  ]);

  console.log('✅ Seeded users and calculations.');
  process.exit();
};

seed();
