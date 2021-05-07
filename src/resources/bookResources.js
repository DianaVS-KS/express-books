const express = require("express");
const BookResources = express.Router();

const { BookControllers } = require('../controllers');
const { Validation } = require('../validations')

BookResources.get('/', BookControllers.readAll);
BookResources.post('/', Validation.Book, BookControllers.createBook);
BookResources.get('/:guid', BookControllers.getByGuid);
BookResources.put('/:guid', Validation.Book, BookControllers.updateBook);
BookResources.delete('/:guid', BookControllers.deleteBook);

module.exports = BookResources;