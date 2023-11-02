const express = require('express');
const app = express();
const itemRoutes = require('./routes/items');
const ExpressError = require('./expressError');

app.use(express.json());
app.use('/items', itemRoutes);

// 404 handler
app.use((req, res, next) => {
    throw new ExpressError('Page not found!', 404);
});

// Error handler
app.use((err, req, res, next) => {
    const message = err.message;
    const status = err.status || 500;
    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;
