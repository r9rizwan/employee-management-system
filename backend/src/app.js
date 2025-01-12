const express = require('express');
// const bodyParser = require('body-parser');
const sequelize = require('./config/db-connection');
const cors = require('cors'); // Import cors middleware

const authRoutes = require('./routes/auth-routes');
const employeeRoutes = require('./routes/employee-routes');
const departmentRoutes = require('./routes/department-routes')
const designationRoutes = require('./routes/designation-routes')

const seedDatabase = require('./seeders/seedData');

const app = express();

// Middleware
app.use(cors({ origin: "*" }));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/designations', designationRoutes);

// Import the seed data script to populate the database
//require('./seeders/seedData');

// Database connection
(async () => {
    try {
        await sequelize.sync({ force: false }); // Set to true only if you want to drop and recreate tables on each start
        console.log('Database connected successfully.');

        // Only seed if needed, e.g., in development or when a specific environment variable is set
        if (process.env.SEED_DATABASE === 'true') {
            await seedDatabase();
        }
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();

app.listen(3000, () => {

    console.log('Server running on http://localhost:3000');
});
