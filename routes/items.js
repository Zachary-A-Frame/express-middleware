const express = require('express');
const ExpressError = require('../expressError');
const items = require("../fakeDb")

const router = express.Router();

// 1 GET /items
router.get("/", function (req, res) {
    res.json({ items })
})

// 2 POST /items
router.post("/", function (req, res) {
    const newItem = {
        name: req.body.name,
        price: req.body.price
    }
    items.push(newItem)
    res.status(201).json({ item: newItem })
})

// 3 GET items/:name
router.get("/:name", function (req,res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    else {
        res.json({ item: foundItem })
    }
})

// 4 Patch /items/:name modify an items name and or price

router.patch("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("Item not found dude", 404)
    }
    if (req.body.name !== undefined) {
        foundItem.name = req.body.name
    }
    if (req.body.price !== undefined) {
        foundItem.price = req.body.price
    }
    res.json({ item: foundItem })
})

router.delete("/:name", function (req, res) {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
        throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
    res.json({ message: "Deleted" })
})

module.exports = router;