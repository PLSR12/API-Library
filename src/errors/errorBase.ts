import { Response } from "express";
import Helper from "../helper/Helper";

class ErrorBase extends Error {
	status: number;
	message: string;
	constructor(message = "Internal Server Error", status = 500) {
		super();
		this.message = message;
		this.status = status;
	}

	sendResponse(res: Response) {
		res.status(this.status).send({
			message: this.message,
			status: this.status,
		});
	}
}

export default ErrorBase;
