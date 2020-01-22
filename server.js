const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');

const auth = require('./routes/api/auth');

// dotenv
dotenv.config({path: './config/config.env'});

const app = express();

// Body parser
app.use(express.json());

// Connect to Database
connectDB();

app.use(passport.initialize());

require('./config/passport')(passport);

// dev logging middleware
if(process.env.NODE_ENV == 'development') {
        app.use(morgan('dev'));
}

app.get('/', (req, res) => res.send('Hello world'));

// Use routes
app.use('/api/auth', auth);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`));

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
        console.log(`Error ${err.message}`.red);
        // Close server & exit process
        server.close(() => process.exit(1));
})