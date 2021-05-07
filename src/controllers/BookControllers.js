const { Book } = require('../models');

const readAll = (req, res) => {
    const query = req.query;
    Book.readAll((books) => {
        //Checking if there is any query param
        if(Object.keys(query).length !== 0){
            //Filter if book matches with some param
            let filteredBooks = books.filter( book => {
                let includeBook = true;
                for(let key of Object.keys(query)){
                    if(key === 'year') query[key] = Number(query[key]);
                    if(book[key] !== query[key]) includeBook = false;
                }
                if(includeBook === true) return includeBook;
            });
            if(filteredBooks.length === 0){
                return res.status(404).send({
                    message: 'Book not found :(',
                });
            }
            return res.send(filteredBooks);
        }
        res.send(books);
    });
};

const createBook = (req, res) => {    
    const { body } = req;
    const newBook = new Book(body);
    Book.readAll((books) => {
        const sameBook = books.filter( book => {
            if(book.title === newBook.title && book.author === newBook.author && book.year === newBook.year){
                return book;
            }
        })
        if(sameBook.length > 0){
            return res.status(409).send({
                message: 'This book already exists, insert a new one',
            });
        }
        newBook.save();
        res.status(201).send({
            message: 'New book created!',
            guid: newBook.getGuid(),
        });
    });    
};


const getByGuid = (req, res) => {
    const { params : { guid } } = req;
    Book.readAll((books) => {
        const book = books.find( ent => ent.guid === guid);
        if(book){
            res.send(book);
        }
        else{
            res.status(404).send({
                message: 'Book not found :(',
            });
        }
    })
};

const updateBook = (req, res) => {
    const { params: { guid }, body } = req;
    Book.readAll((books) => {
      const book = books.find(ent => ent.guid === guid);
      if(book) {
        const sameBook = books.filter(b => {
            if(b.title === body.title && b.author === body.author && b.year === body.year){
                return b;
            }
        })
        if(sameBook.length > 0){
            return res.status(409).send({
                message: 'This book already exists, insert a new one',
            });
        }
        Object.assign(book, body);
        Book.update(books);
        res.send({
          message: 'Book successfully updated!',
        });
      } else {
        res.status(404).send({
          message: 'Book not found :(',
        });
      }
    });
};

const deleteBook = (req, res) => {
    const { guid } = req.params;
  // Read all books
  Book.readAll((books) => {
    // Filter by guid
    const bookGuid = books.findIndex(ent => ent.guid === guid);

    if (bookGuid !== -1) {
      books.splice(bookGuid, 1);
      Book.update(books);
      res.send({
        message: 'Book successfully deleted!',
      });
    }
    else {
      res.status(404).send({
        message: 'Book not found :(',
      });
    }
  });
};

module.exports = {
    readAll,
    createBook,
    getByGuid,
    updateBook,
    deleteBook,
};