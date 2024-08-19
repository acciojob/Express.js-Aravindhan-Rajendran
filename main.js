const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// In-memory data store (an array of books)
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
];

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET /books/:id - Retrieve a specific book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
  const { title, author, year } = req.body;
  const newBook = {
    id: books.length + 1, // Generate a new ID
    title,
    author,
    year
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const { title, author, year } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.year = year || book.year;

  res.json(book);
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook);
});

// Start the server
const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
