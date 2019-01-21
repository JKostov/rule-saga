require('dotenv').config();

const {
  PORT,
  MONGODB_HOST,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,
  EMAIL_ACC,
  EMAIL_PASS,
  FRONTEND_DOMAIN,
  APP_DOMAIN,
} = process.env;

const port = PORT || 3000;

module.exports = {
  port,
  domains: {
    frontend: FRONTEND_DOMAIN,
    api: APP_DOMAIN,
  },
  mail: {
    account: EMAIL_ACC,
    password: EMAIL_PASS,
  },
  db: {
    host: MONGODB_HOST,
    user: MONGODB_USER,
    password: MONGODB_PASSWORD,
    database: MONGODB_DATABASE,
  },
};
