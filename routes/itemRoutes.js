const express = require('express');
const router = express.Router();
const items = require('../fakeDb');
const ExpressError = require('../expressError');

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

// Route to get a particular item based on name
router.get('/:name', (req, res) => {
    const { name } = req.params;
    const foundItem = items.find((item) => item.name === name);
    if (!foundItem) throw new ExpressError('Item not found.', 404);
    return res.status(200).json(foundItem);
});

module.exports = router;
