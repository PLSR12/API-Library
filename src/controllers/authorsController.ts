import { NextFunction, Request, Response } from "express";
import Authors from "../models/Author";
import { IAuthor } from "../types/Author";
import Helper from "../helper/Helper";
import ErrorNotFound from "../errors/errorNotFound";

class AuthorsController {
	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const allAuthors: IAuthor[] = await Authors.find();

			return res
				.status(200)
				.send(Helper.ResponseData(200, null, null, allAuthors));
		} catch (error) {
			next(error);
		}
	};

	static getOne = async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		try {
			const author: IAuthor | null = await Authors.findById(id);

			if (author) {
				return res
					.status(200)
					.send(Helper.ResponseData(200, null, null, author));
			} else {
				next(new ErrorNotFound("Id Author not found"));
			}
		} catch (error) {
			next(error);
		}
	};

	static create = async (req: Request, res: Response, next: NextFunction) => {
		const author = new Authors(req.body);

		try {
			await author.save();
			return res
				.status(201)
				.send(Helper.ResponseData(201, null, null, author.toJSON()));
		} catch (error) {
			next(error);
		}
	};

	static update = async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		try {
			const authorEdited = await Authors.findByIdAndUpdate(id, {
				$set: req.body,
			});

			if (authorEdited) {
				return res
					.status(200)
					.send(Helper.ResponseData(200, null, null, authorEdited));
			} else {
				next(new ErrorNotFound("Id Author not found"));
			}
		} catch (error) {
			next(error);
		}
	};

	static delete = async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		try {
			const authorDeleted = await Authors.findByIdAndDelete(id);
			if (authorDeleted) {
				return res.status(200).send(Helper.ResponseData(200, null, null, null));
			} else {
				next(new ErrorNotFound("Id Author not found"));
			}
		} catch (error) {
			next(error);
		}
	};
}

export default AuthorsController;
