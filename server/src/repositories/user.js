const { hashPassword } = require('services/auth');
const {
  User,
} = require('models');

/**
 * Updates password of user with given id
 * @param id
 * @param newPassword
 * @returns {Promise<Query>}
 */
const updatePassword = async (id, newPassword) => User.findByIdAndUpdate(id,
  {
    $set: {
      password: hashPassword(newPassword),
    },
  },
  {
    new: true, useFindAndModify: false,
  },
).lean().exec();

module.exports = {
  updatePassword,
};
