const express = require('express')
const router = express.Router()
const BookModel = require('../models/books')

router.get('/', (req, res) => {
  BookModel.getBooks().then(books => {
    res.render('index', {
      books
    })
  })
})
router.get('/add', (req, res) => {
  res.render('add')
})
router.post('/add', (req, res) => {
  const book = req.body
  BookModel.addBook(book).then(() => {
    res.redirect('/')
  })
})
router.get('/:bookId/remove', (req, res) => {
  const bookId = req.params.bookId
  BookModel.delBook(bookId).then(() => {
    res.redirect('/')
  })
})
router.get('/:bookId/edit', (req, res) => {
  const bookId = req.params.bookId
  BookModel.getBook(bookId).then(book => {
    res.render('edit', {
      book,
      bookId
    })
  })
})
router.post('/:bookId/edit', (req, res) => {
  const bookId = req.params.bookId
  const book = req.body
  BookModel.editBook(bookId, book).then(() => {
    res.redirect('/')
  })
})

module.exports = router