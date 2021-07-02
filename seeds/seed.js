const sequelize = require('../config/connection');
const { User, Posting } = require('../models');

const userData = require('./userData.json');
const postingData = require('./postingData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const posting of postingData) {
    await Posting.create({
      ...posting,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
