const express = require('express');
// const bodyParser = require('body-parser');
const sequelize = require('./config/db-connection');
const cors = require('cors'); // Import cors middleware

const authRoutes = require('./routes/auth-routes');
const employeeRoutes = require('./routes/employee-routes');

const app = express();

// Middleware
app.use(cors({ origin: "*" }));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Database connection
(async () => {
    try {
        await sequelize.sync({ force: false }); // Set to true only for development
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();

app.listen(3000, () => {

    console.log('Server running on http://localhost:3000');
});
