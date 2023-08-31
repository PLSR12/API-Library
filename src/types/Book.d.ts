import mongoose from 'mongoose'

export type IBook = {
  id: string
  title: string
  author: mongoose.Schema.Types.ObjectId
  publishingCompany: string
  numberPages: number
}
