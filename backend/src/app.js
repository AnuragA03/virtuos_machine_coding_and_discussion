const  express  = require('express');
const { PrismaClient } = require('@prisma/client');
const studentRoutes = require('./routes/studentRoute')
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

const checkDbConnection = async () => {
    try {
        // Example code
        await prisma.$queryRaw`SELECT 1`;
        console.log('Database connection successful.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
checkDbConnection();

// api for student routes
app.use('/api', studentRoutes);

module.exports = app;