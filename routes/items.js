const express = require('express');
const router = express.Router();
const items = require('../fakeDb');
const ExpressError = require('../expressError');

// Route to get all items
router.get('/', (req, res) => {
    return res.status(200).json(items);
});

// Route to add new item
router.post('/', (req, res) => {
    const newItem = req.body;
    const { name, price } = newItem;
    if (!name || !price)
        throw new ExpressError('Name and price must be present.', 400);
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

// Route to delete an item
router.delete('/:name', (req, res) => {
    const itemIndex = items.findIndex((item) => item.name === req.params.name);
    if (itemIndex === -1) throw new ExpressError('Item not found.', 404);
    items.splice(itemIndex, 1);
    return res.json({ message: 'Deleted!' });
});

module.exports = router;
