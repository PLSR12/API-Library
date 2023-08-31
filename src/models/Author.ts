import mongoose from 'mongoose'
import { IAuthor } from '../types/Author'

const authorSchema = new mongoose.Schema<IAuthor>(
  {
    id: { type: String },
    name: { type: String, required: true },
    nationality: { type: String },
  },
  {
    versionKey: false,
  }
)

const Authors = mongoose.model('authors', authorSchema)
export default Authors
