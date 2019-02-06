const faker = require('faker');
const Rule = require('models/rule');
ObjectId = require('mongodb').ObjectID;

const companies = [
    {
        id: '569ed8269353e9f4c51617a1',
        name: 'Frame',
        categories: [
            'Kitchen rules',
            'Programming rules',
            'Tutorials',
        ],
    },
    {
        id: '569ed8269353e9f4c51617a2',
        name: 'Nutanix',
        categories: [
            'Deployment rules',
            'Programming rules',
            'Dress code',
        ],
    },
];

const types = ['image', 'text', 'enumeration'];

module.exports = {
    up: async () => {
        const insertData = [];
        for (let i = 0; i < 20; i += 1) {
            const company = faker.random.arrayElement(companies);

            const data = [];
            const len = faker.random.number({
                'min': 3,
                'max': 8
            });
            for (let j = 0; j < len; j++) {
                const type = faker.random.arrayElement(types);
                let content;
                switch (type) {
                    case 'image':
                        content = `${faker.random.number()}.jpg`;
                        break;
                    case 'text':
                        content = faker.lorem.paragraph();
                        break;
                    case 'enumeration':
                        content = faker.random.words().split(' ');
                        break;
                }
                data.push({
                    type,
                    content,
                });
            }

            const rule = new Rule({
                name: faker.name.jobDescriptor(),
                category: faker.random.arrayElement(company.categories),
                tags: [
                    faker.lorem.word(),
                    faker.lorem.word(),
                    faker.lorem.word(),
                ],
                company: {
                    _id: ObjectId(company.id),
                    name: company.name,
                },
                data,
            });

            insertData.push(rule.save());
        }

        await Promise.all(insertData);
    },
    down: async () => {
        await Rule.deleteMany();
    },
};
