import mongoose, { MongooseError } from "mongoose";
import { NextFunction, Request, Response } from "express";
import ErrorBase from "../errors/errorBase";
import BadRequest from "../errors/badRequest";
import errorValidation from "../errors/errorValidation";
import ErrorNotFound from "../errors/errorNotFound";

const errorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(error);
	if (error instanceof mongoose.Error.CastError) {
		new BadRequest().sendResponse(res);
	} else if (error instanceof mongoose.Error.ValidationError) {
		new errorValidation(error).sendResponse(res);
	} else if (error instanceof ErrorBase) {
		error.sendResponse(res);
	} else if (error instanceof ErrorNotFound) {
		error.sendResponse(res);
	} else {
		new ErrorBase().sendResponse(res);
	}
};

export default errorHandler;
