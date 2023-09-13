import { NextFunction, Request, Response } from "express";
import Books from "../models/Book";
import { IBook } from "../types/Book";
import Helper from "../helper/Helper";
import ErrorNotFound from "../errors/errorNotFound";
import { Authors } from "../models";
import BadRequest from "../errors/badRequest";

class BooksController {
	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const allBooks: IBook[] = await Books.find().sort({ title: 1 }).exec();

			return res
				.status(200)
				.send(Helper.ResponseData(200, null, null, allBooks));
		} catch (error) {
			next(error);
		}
	};

	static getPagination = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { limit = 1, page = 1 }: any = req.query;

			const limitParsed = parseInt(limit);
			const pageParsed = parseInt(page);

			if (limitParsed > 0 && pageParsed > 0) {
				const booksPaginated = await Books.find()
					.skip((pageParsed - 1) * limitParsed)
					.sort({ title: 1 })
					.limit(limitParsed)
					.exec();

				return res
					.status(200)
					.send(Helper.ResponseData(200, null, null, booksPaginated));
			} else {
				next(new BadRequest());
			}
		} catch (error) {
			next(error);
		}
	};

	static getOne = async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		try {
			const book: IBook | null = await Books.findOne({ _id: id }).exec();

			if (book) {
				return res.status(200).send(Helper.ResponseData(200, null, null, book));
			} else {
				next(new ErrorNotFound("Id Book not found"));
			}
		} catch (error) {
			next(error);
		}
	};

	static create = async (req: Request, res: Response, next: NextFunction) => {
		const book = new Books(req.body);

		try {
			await book.save();
			return res
				.status(201)
				.send(Helper.ResponseData(201, null, null, book.toJSON()));
		} catch (error) {
			next(error);
		}
	};

	static update = async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		try {
			const bookEdited = await Books.findByIdAndUpdate(id, { $set: req.body });

			if (bookEdited) {
				return res
					.status(200)
					.send(Helper.ResponseData(200, null, null, bookEdited));
			} else {
				next(new ErrorNotFound("Id Book not found"));
			}
		} catch (error) {
			next(error);
		}
	};

	static delete = async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		try {
			const bookDeleted = await Books.findByIdAndDelete(id);

			if (bookDeleted) {
				return res.status(200).send(Helper.ResponseData(200, null, null, null));
			} else {
				next(new ErrorNotFound("Id Book not found"));
			}
		} catch (error) {
			next(error);
		}
	};

	static getByFilter = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { publishingCompany, title, nameAuthor } = req.query;
			const searchParams: any = {};

			if (publishingCompany) {
				searchParams.publishingCompany = publishingCompany;
			}

			if (title) {
				const regexTitle = new RegExp(`${title}`, "i");
				searchParams.title = regexTitle;
			}

			if (nameAuthor) {
				const author = await Authors.findOne({ name: nameAuthor });

				if (author) {
					const authorId = author._id;
					searchParams.author = authorId;
				} else {
					res.status(200).send([]);
				}
			}

			const booksFiltered = await Books.find(searchParams);

			if (booksFiltered) {
				return res
					.status(200)
					.send(Helper.ResponseData(200, null, null, booksFiltered));
			} else {
				next(new ErrorNotFound("Book not found"));
			}
		} catch (error) {
			next(error);
		}
	};
}

export default BooksController;
