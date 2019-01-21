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
    new: true,
  },
);

module.exports = {
  updatePassword,
};
