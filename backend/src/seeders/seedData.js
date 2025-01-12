const Department = require('../models/department');
const Designation = require('../models/designation');

module.exports = async function seedDatabase() {
    try {
        console.log('Seeding data...');
        await Department.bulkCreate([
            { name: 'Sales' },
            { name: 'Marketing' },
            { name: 'Engineering' },
            { name: 'HR' },
            { name: 'Finance' },
            { name: 'Operations' },
            { name: 'IT' },
            { name: 'Legal' },
            { name: 'Customer Support' },
            { name: 'Product' },
            { name: 'Design' },
            { name: 'Logistics' }
        ], { ignoreDuplicates: true });

        console.log('Departments seeded');

        await Designation.bulkCreate([
            { title: 'Manager' },
            { title: 'Developer' },
            { title: 'HR Specialist' },
            { title: 'Sales Executive' },
            { title: 'Marketing Specialist' },
            { title: 'Customer Service Representative' },
            { title: 'Product Manager' },
            { title: 'Data Scientist' },
            { title: 'Financial Analyst' },
            { title: 'Operations Manager' },
            { title: 'Legal Advisor' },
            { title: 'Graphic Designer' }
        ], { ignoreDuplicates: true });

        console.log('Designations seeded');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};
