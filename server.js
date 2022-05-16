require('dotenv').config();
const cookieParser = require('cookie-parser');

const express = require('express');
const path = require('path');
const app = express();

// Database connection:
const connectDB = require('./db/connect_db');

const cors = require('cors')

const PORT = process.env.PORT || 3001;

// Middlewares:
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Docs route:
const swaggerUI = require('swagger-ui-express');
const specs = require('./swagger/swagger_config');



app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

// API Routes:
const authRoutes = require('./routes/auth_routes');
const landingRoutes = require('./routes/landings_routes');
const neasRoutes = require('./routes/neas_routes');

const { authenticateToken } = require('./middlewares/auth_middlewares');

app.use('/api/auth', authRoutes);
// app.use('/api/astronomy/landings', authenticateToken, landingRoutes);
app.use('/api/astronomy/landings', landingRoutes);
app.use('/api/astronomy/neas', authenticateToken, neasRoutes)

// REACT Routes:
// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// })

// Error handlers:
app.use((error, req, res, next) => {
    if (error.type === 'custom_error') {
        return res.status(400).json({ response: false, message: `Bad request: ${error.message}`, full_error: error })
    }
    if (error.type === 'authentication_error' && error.code === 400) {
        return res.status(400).json({ response: false, authenticated: false, message: `Bad request: ${error.message}`, full_error: error })
    }
    if (error.type === 'validation_error' && error.code === 400) {
        return res.status(400).json({ response: false, authenticated: false, message: `Bad request: ${error.message}`, full_error: error })
    }
    if (error.type === 'authentication_error' && error.code === 401) {
        return res.status(401).json({ response: false, authenticated: false, message: `Unauthorized: ${error.message}`, full_error: error })
    }
    if (error.type === 'authentication_error' && error.code === 403) {
        return res.status(403).json({ response: false, message: `Forbidden: ${error.message}`, full_error: error })
    }
    else if (error.type !== 'custom_error') {
        return res.status(500).json({ response: false, error: error })
    }
    else {
        return next()
    }
});
app.use((req, res) => {
    res.status(404).json({ response: false, message: 'Route not found' })
})


app.listen(PORT, async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log(`Server listening on port ${PORT}...`)
    }
    catch (error) {
        console.log(error);
    }
});