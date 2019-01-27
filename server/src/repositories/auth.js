const { PasswordRecovery, User } = require('models');

/**
 * Returns password recovery by token with it's user
 * @param token
 * @returns {Promise<{user}>}
 */
const getPasswordRecoveryWithUser = async token => {
  const passwordRecovery = await PasswordRecovery.findOne({ token }).lean().exec();
  const user = await User.findById(passwordRecovery.userId).lean().exec();

  return {
    ...passwordRecovery,
    user,
  }
};

module.exports = {
  getPasswordRecoveryWithUser,
};
