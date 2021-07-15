const User = require('./User');
const Posting = require('./Posting');

User.hasMany(Posting, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Posting.belongsTo(User, {
  foreignKey: 'user_id'
});

Posting.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(Posting, {
  foreignKey: 'post_id'
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})
Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Posting };
