const Company = require('models/company');
const User = require('models/user');
const bcrypt = require('bcrypt');
ObjectId = require('mongodb').ObjectID;

const passwordHashSaltRounds = 10;

const companyIds = [
  '569ed8269353e9f4c51617a1',
  '569ed8269353e9f4c51617a2',
];

const companyNames = [
  'Frame',
  'Nutanix',
];

const userIds = [
  '569ed8269353e9f4c51617a3',
  '569ed8269353e9f4c51617a4',
  '569ed8269353e9f4c51617a5',
  '569ed8269353e9f4c51617a6',
];


module.exports = {
  up: async () => {
    const insertData = [];
    for (let i = 0; i < 2; i += 1) {
      const company = new Company({
        _id: ObjectId(companyIds[i]),
        name: companyNames[i],
        email: `company${i}@test.com`,
        password: bcrypt.hashSync('test', passwordHashSaltRounds),
        users: [
          await User.findById(userIds[i]),
          await User.findById(userIds[i+2]),
        ],
        status: 'active',
      });

      insertData.push(company.save());
    }

    await Promise.all(insertData);
  },
  down: async () => {
    await Company.deleteMany();
  },
};
