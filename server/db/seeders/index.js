#!/usr/bin/env node
require('module-alias/register');
const CompanySeeder = require('./company-seeder');
const UserSeeder = require('./user-seeder');


if (!process.argv[1] || !process.argv[2]) {
  console.log('Insufficient number of arguments! Please give up or down.');
  process.exit(0);
}

require('services/db')();

const seeders = [UserSeeder, CompanySeeder];
const type = process.argv[2];

const promises = seeders.map(seed => seed[type]());

Promise.all(promises)
  .then(() => {
    console.log(`DB seeds successfully ran ${type}.`);
    process.exit(0);
  })
  .catch((ex) => {
    console.log(ex);
    process.exit(0);
  });
