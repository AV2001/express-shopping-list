const express = require('express');
const router = express.Router();
const items = require('../fakeDb');

router.get('/', (req, res) => {
    return res.status(200).json({ items });
});

module.exports = router;
