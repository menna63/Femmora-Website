/*const path    = require('path');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');
require('dotenv').config();
const app     = express();
const mainRouter = require('./routers/MainRouter'); 
app.set('views', path.join(__dirname, 'FrontEnd/html'));  
app.set('view engine', 'ejs');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(mainRouter);
app.use('/css', express.static(path.join(__dirname, 'FrontEnd/css')));
app.use('/js',  express.static(path.join(__dirname, 'FrontEnd/js')));
//menna

// Middleware setup
app.use(cors());
app.use(express.json()); // This is crucial for parsing JSON bodies
app.use(express.urlencoded({ extended: true }))

// Routes
const checkoutRoutes = require('./routers/checkoutRoute');
app.use('/api/checkout', checkoutRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/
const path = require('path');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const mainRouter = require('./routers/MainRouter'); 
const checkoutRoutes = require('./routers/checkoutRoute');



// View engine setup
app.set('views', path.join(__dirname, 'Views/html'));  
app.set('view engine', 'ejs');

// Static files
app.use('/css', express.static(path.join(__dirname, 'Views/css')));
app.use('/js', express.static(path.join(__dirname, 'Views/js')));

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(helmet());

// Routes
app.use(mainRouter);
app.use('/api/checkout', checkoutRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
