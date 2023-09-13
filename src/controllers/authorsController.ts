import { NextFunction, Request, Response } from "express";
import Authors from "../models/Author";
import { IAuthor } from "../types/Author";
import Helper from "../helper/Helper";

class AuthorsController {
	static getAll = (req: Request, res: Response, next: NextFunction) => {
		Authors.find((error: any, authors: IAuthor) => {
			if (error) {
				next(error);
			} else {
				return res
					.status(200)
					.send(Helper.ResponseData(200, null, null, authors));
			}
		});
	};

	static getOne = (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		Authors.findOne({ _id: id }, (error: any, author: IAuthor) => {
			if (error) {
				next(error);
			} else {
				return res
					.status(200)
					.send(Helper.ResponseData(200, null, null, author));
			}
		});
	};

	static create = (req: Request, res: Response, next: NextFunction) => {
		const author = new Authors(req.body);

		author.save((error) => {
			if (error) {
				next(error);
			} else {
				return res
					.status(201)
					.send(Helper.ResponseData(201, null, null, author.toJSON()));
			}
		});
	};

	static update = (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		Authors.findByIdAndUpdate(id, { $set: req.body }, (error: any) => {
			if (error) {
				next(error);
			} else {
				next(error);
			}
		});
	};

	static delete = (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		Authors.findByIdAndDelete(id, (error: any) => {
			if (error) {
				next(error);
			} else {
				return res.status(200).send(Helper.ResponseData(200, null, null, null));
			}
		});
	};
}

export default AuthorsController;
