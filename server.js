require('dotenv').config();

const express = require('express');
const app = express();

// Database connection:
const connectDB = require('./db/connect_db');

const port = process.env.PORT || 3000;

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes:
const landingRoutes = require('./routes/landing_routes');

app.use('/api/astronomy/landings', landingRoutes);

app.use((err, req, res, next) => {
    if (err) {
        console.log('Error from server')
        res.json({ err })
    }
    else {
        return next()
    }
});

app.use((req, res) => {
    const message = 'Route not found';
    res.json({ message })
})


app.listen(port, async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log(`Server listening on port ${port}...`)
    }
    catch (error) {
        console.log(error);
    }
});