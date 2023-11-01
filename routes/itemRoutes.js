const express = require('express');
const router = express.Router();
const items = require('../fakeDb');

// Route to get all items
router.get('/', (req, res) => {
    return res.status(200).json({ items });
});

// Route to add new item
router.post('/', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    return res
        .status(201)
        .json({ added: { name: newItem.name, price: newItem.price } });
});

module.exports = router;
