import express from 'express'
import AuthorsController from '../controllers/authorsController'
import BooksController from '../controllers/booksController'

const router = express.Router()

router.get('/authors', AuthorsController.getAll)
router.get('/authors/:id', AuthorsController.getOne)
router.post('/authors', AuthorsController.create)
router.put('/authors/:id', AuthorsController.update)
router.delete('/authors/:id', AuthorsController.delete)

router.get('/books', BooksController.getAll)
router.get('/books/search', BooksController.getByPublishingCompany)
router.post('/books', BooksController.create)
router.get('/books/:id', BooksController.getOne)
router.put('/books/:id', BooksController.update)
router.delete('/books/:id', BooksController.delete)

export default router
