const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.collection.insertMany(userData);
  await Thought.collection.insertMany(thoughtData);

  console.info('Seeding complete! 🌱');
  console.table(userData);
  console.table(thoughtData);
  process.exit(0);
});