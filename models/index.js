const User = require('./User');
const Posting = require('./Posting');

User.hasMany(Posting, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Posting.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Posting };
