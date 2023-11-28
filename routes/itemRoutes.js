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

// Route to get a particular item
router.get('/:name', (req, res) => {
    const foundItem = items.find((item) => item.name === req.params.name);
    if (!foundItem) throw new ExpressError('Item not found.', 404);
    return res.status(200).json(foundItem);
});

// Route to update a particular item
router.patch('/:name', (req, res) => {
    const foundItem = items.find((item) => item.name === req.params.name);
    if (!foundItem) throw new ExpressError('Item not found.', 404);
    foundItem.name = req.body.name || foundItem.name;
    foundItem.price = req.body.price || foundItem.price;
    return res.json({ updated: foundItem });
});

module.exports = router;
