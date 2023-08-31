import { Request, Response } from 'express'
import Books from '../models/Book'
import { IBook } from '../types/Book'
import Helper from '../helper/Helper'

class BooksController {
  static getAll = (req: Request, res: Response) => {
    Books.find()
      .populate('author')
      .exec((error: any, books: IBook[]) => {
        if (error) {
          return res.status(500).send(Helper.ResponseData(500, '', error, null))
        } else {
          return res
            .status(200)
            .send(Helper.ResponseData(200, null, null, books))
        }
      })
  }

  static getOne = (req: Request, res: Response) => {
    const id = req.params.id

    Books.findOne({ _id: id })
      .populate('author', 'name')
      .exec((error: any, book: IBook | null) => {
        if (error) {
          return res.status(500).send(Helper.ResponseData(500, '', error, null))
        } else {
          return res
            .status(200)
            .send(Helper.ResponseData(200, null, null, book))
        }
      })
  }

  static create = (req: Request, res: Response) => {
    const book = new Books(req.body)

    book.save((error: any) => {
      if (error) {
        return res
          .status(500)
          .send(
            Helper.ResponseData(500, 'Falha ao cadastrar livro', error, null)
          )
      } else {
        return res
          .status(200)
          .send(Helper.ResponseData(201, null, null, book.toJSON()))
      }
    })
  }

  static update = (req: Request, res: Response) => {
    const id = req.params.id

    Books.findByIdAndUpdate(id, { $set: req.body }, (error: any) => {
      if (error) {
        return res
          .status(500)
          .send(
            Helper.ResponseData(500, 'Falha ao atualizar livro', error, null)
          )
      } else {
        return res
          .status(200)
          .send(
            Helper.ResponseData(200, 'Livro atualizado com sucesso', null, null)
          )
      }
    })
  }

  static delete = (req: Request, res: Response) => {
    const id = req.params.id

    Books.findByIdAndDelete(id, (error: any) => {
      if (error) {
        return res
          .status(500)
          .send(Helper.ResponseData(500, 'Falha ao deletar livro', error, null))
      } else {
        return res
          .status(200)
          .send(
            Helper.ResponseData(200, 'Livro deletado com sucesso', null, null)
          )
      }
    })
  }

  static getByPublishingCompany = (req: Request, res: Response) => {
    const publishingCompany = req.params.publishingCompany

    Books.findOne(
      { publishingCompany: publishingCompany },
      {},
      (error: any, books: IBook[]) => {
        if (error) {
          return res
            .status(500)
            .send(Helper.ResponseData(500, null, error, null))
        } else {
          return res
            .status(200)
            .send(Helper.ResponseData(200, null, null, books))
        }
      }
    )
  }
}

export default BooksController
