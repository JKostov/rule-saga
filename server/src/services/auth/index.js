const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { appKey } = require('config');

const passwordHashSaltRounds = 10;

const decrypt = token => jwt.verify(token, appKey);

const encrypt = data => jwt.sign(data, appKey);

const hashPassword = password => bcrypt.hashSync(password, passwordHashSaltRounds);

const comparePasswords = (plainPass, encrypted) => bcrypt.compare(plainPass, encrypted);

module.exports = {
  decrypt,
  encrypt,
  comparePasswords,
  hashPassword,
};
