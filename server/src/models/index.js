const Company = require('./company');
const User = require('./user');
const PasswordRecovery = require('./passwordRecovery');
const CompanyInvitation = require('./companyInvitation');
const Rule = require('./rule');
const Tag = require('./tag');
const Category = require('./category');

const models = {
  Company,
  User,
  Rule,
  Tag,
  Category,
  PasswordRecovery,
  CompanyInvitation,
};

module.exports = models;
