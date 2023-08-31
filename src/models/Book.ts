import mongoose from 'mongoose'
import { IBook } from '../types/Book'

const BookSchema = new mongoose.Schema<IBook>(
  {
    id: { type: String },
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'authors',
      required: true,
    },
    publishingCompany: { type: String, required: true },
    numberPages: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
)

const Books = mongoose.model('books', BookSchema)

export default Books
