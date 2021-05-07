const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const p = path.join(path.dirname(require.main.filename), 'data', 'books.json');

module.exports = class Book {
    constructor(data) {
        const { title, author, year, tags } = data;
        this.guid = uuid.v4();
        this.title = title;
        this.author = author;
        this.year = Number(year);
        this.tags = tags;
    }

    getGuid() {
        return this.guid;
    }

    save() {
        // We read the file everytime we need to modify it
        fs.readFile(p, (err, data) => {
        let books = [];
        if (!err) {
            books = JSON.parse(data);
        }
        books.push(this);
        // Write the file
        fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));
        });
    }

    static update(books) {
        fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));
    }

    static readAll(cb){
        fs.readFile(p, (err, data) => {
            if (err) res.status(500).json({ err });
            let books = [];
            books = JSON.parse(data);
            cb(books);
        });
    }
};