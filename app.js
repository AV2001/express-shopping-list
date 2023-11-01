const express = require('express');
const itemRoutes = require('./routes/itemRoutes');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());
app.use('/items', itemRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    return res.status(message).json({
        error: { message, status },
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000.');
});
