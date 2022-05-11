require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

// Database connection:
const connectDB = require('./db/connect_db');

// Various imports:
const cors = require('cors')

const port = process.env.PORT || 3001;

// Middlewares:
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "build")));

// API Routes:
const landingRoutes = require('./routes/landing_routes');

app.use('/api/astronomy/landings', landingRoutes);

// REACT Routes:
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// Error handlers:
app.use((err, req, res, next) => {
    if (err.type === 'custom_error') {
        return res.status(400).json({response: false, message: 'Error from server (custom): ' + err.message})
    }
    else if (err.type !== 'custom_error') {
        return res.status(400).json({response: false, message: 'Error: ' + err})
    }
    else {
        return next()
    }
});
app.use((req, res) => {
    res.status(404).json({ response: false, message: 'Route not found' })
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