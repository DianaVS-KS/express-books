const { check, validationResult } = require('express-validator');

const Book = [
    check('title')
        .exists().withMessage('Please insert a title')
        .bail()
        .isString().withMessage('Title not valid'),
    check('author')
        .exists().withMessage('Please insert an author')
        .bail()
        .isString().withMessage('Author not valid').not().isNumeric(),
    check('year')
        .exists().withMessage('Please insert a publication year')
        .bail()
        .isNumeric().withMessage('Year only accepts numbers')
        .bail()
        .custom((value) => {
            if(1454 > value || value > 2021) {
                throw new Error('Insert a year larger than 1454 and lower than the current year');
            }
            return true;
        }),
    check('tags')
        .exists().withMessage('Please insert at least 1 tag')
        .bail()
        .isArray({min: 1}),
    check('tags.*')
        .isString().withMessage('Tags not valid'),
    
    (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) return res.status(400).json(err);
        return next();
    },

];

module.exports = {
    Book,
};