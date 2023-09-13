import ErrorBase from "./errorBase";

class BadRequest extends ErrorBase {
	constructor() {
		super("One or more data provided is incorrect!", 400);
	}
}

export default BadRequest;
