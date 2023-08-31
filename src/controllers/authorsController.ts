import { Request, Response } from 'express'
import Authors from '../models/Author'
import { IAuthor } from '../types/Author'
import Helper from '../helper/Helper'

class AuthorsController {
  static getAll = (req: Request, res: Response) => {
    Authors.find((error: any, authors: IAuthor) => {
      if (error) {
        return res.status(500).send(Helper.ResponseData(500, '', error, null))
      } else {
        return res
          .status(200)
          .send(Helper.ResponseData(200, null, null, authors))
      }
    })
  }

  static getOne = (req: Request, res: Response) => {
    const id = req.params.id

    Authors.findOne({ _id: id }, (error: any, author: IAuthor) => {
      if (error) {
        return res.status(500).send(Helper.ResponseData(500, '', error, null))
      } else {
        return res
          .status(200)
          .send(Helper.ResponseData(200, null, null, author))
      }
    })
  }

  static create = (req: Request, res: Response) => {
    const author = new Authors(req.body)

    author.save((error) => {
      if (error) {
        return res.status(500).send(Helper.ResponseData(500, '', error, null))
      } else {
        return res
          .status(201)
          .send(Helper.ResponseData(200, null, null, author.toJSON()))
      }
    })
  }

  static update = (req: Request, res: Response) => {
    const id = req.params.id

    Authors.findByIdAndUpdate(id, { $set: req.body }, (error: any) => {
      if (error) {
        return res
          .status(500)
          .send(
            Helper.ResponseData(500, 'Falha ao atualizar autot', error, null)
          )
      } else {
        return res
          .status(200)
          .send(
            Helper.ResponseData(200, 'Autor atualizado com sucesso', null, null)
          )
      }
    })
  }

  static delete = (req: Request, res: Response) => {
    const id = req.params.id

    Authors.findByIdAndDelete(id, (error: any) => {
      if (error) {
        return res
          .status(500)
          .send(Helper.ResponseData(500, 'Falha ao deletar autor', error, null))
      } else {
        return res
          .status(200)
          .send(
            Helper.ResponseData(200, 'Autor deletado com sucesso', null, null)
          )
      }
    })
  }
}

export default AuthorsController
