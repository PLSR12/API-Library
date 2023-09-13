import { Request, Response, NextFunction } from "express";
import ErrorNotFound from "../errors/errorNotFound";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	const error404 = new ErrorNotFound();
	next(error404);
};

export default notFoundHandler;
