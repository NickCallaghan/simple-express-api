const express = require('express');
const records = require('./records');
const router = express.Router();

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}

// Gets all quotes
router.get('/quotes/', asyncHandler(async (req, res, next) => {
    const quotes = await records.getQuotes();
    res.json(quotes);
}));


// Gets a specific quote
router.get('/quotes/:id', asyncHandler(async (req, res, next) => {

    const quote = await records.getQuote(req.params.id);
    if (quote) {
        res.json(quote);
    } else {
        res.status(404).json({
            message: "Quote not found"
        });
    }
}));

//Creates a quote
router.post('/quotes', asyncHandler(async (req, res, next) => {

    if (req.body.author && req.body.quote) {
        const quote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        });
        res.status(201).json(quote);

    } else {
        res.status(400).json({
            error: "Quote and autor required"
        });
    }
}));

router.put('/quotes/:id', asyncHandler(async (req, res, next) => {

    let quote = await records.getQuote(req.params.id);
    if (quote) {
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await records.updateQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({
            message: "Quote not found!"
        });
    }
}))

// Delete a quote
router.delete('/quotes/:id', asyncHandler(async (req, res, next) => {

    const quote = await records.getQuote(req.params.id);
    if (quote) {
        await records.deleteQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({
            message: "quote not found"
        });
    }
}));

module.exports = router