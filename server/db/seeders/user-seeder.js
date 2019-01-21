const faker = require('faker');
const User = require('models/user');
const bcrypt = require('bcrypt');
ObjectId = require('mongodb').ObjectID;

const passwordHashSaltRounds = 10;

const companies = [
  {
    id: '569ed8269353e9f4c51617a1',
    name: 'Frame'
  },
  {
    id: '569ed8269353e9f4c51617a2',
    name: 'Nutanix'
  },
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

    for (let i = 0; i < 4; i += 1) {
      let company = null;
      if (i % 2 === 0) {
        company = companies[0];
      } else {
        company = companies[1];
      }

      const user = new User({
        _id: ObjectId(userIds[i]),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: `user${i}@test.com`,
        password: bcrypt.hashSync('test', passwordHashSaltRounds),
        company: {
          _id: ObjectId(company.id),
          name: company.name,
        },
        status: 'active',
      });

      insertData.push(user.save());
    }

    await Promise.all(insertData);
  },
  down: async () => {
    await User.deleteMany();
  },
};
