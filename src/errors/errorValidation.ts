import { CastError, MongooseError } from "mongoose";
import ErrorBase from "./errorBase";

interface ValidatorErrorMoongoose extends MongooseError {
	properties: {
		message: string;
		type?: string;
		path?: string;
		value?: any;
		reason?: any;
	};
	kind: string;
	path: string;
	value: any;
	reason?: MongooseError | null;
}

interface ErrorValidation extends MongooseError {
	errors: { [path: string]: CastError | ValidatorErrorMoongoose };
}

class errorValidation extends ErrorBase {
	constructor(error: any) {
		const messageErrorValidate = Object.values(error.errors)
			.map((error: any) => error.message)
			.join("; ");
		super(messageErrorValidate, 400);
	}
}

export default errorValidation;
