import mongoose from "mongoose";
import { IBook } from "../types/Book";
import autopopulate from "mongoose-autopopulate";

const BookSchema = new mongoose.Schema<IBook>(
	{
		id: { type: String },
		title: { type: String, required: true },
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "authors",
			required: true,
			autopopulate: true,
		},
		publishingCompany: { type: String, required: true },
		numberPages: {
			type: Number,
			required: true,
			min: [10, "The number of pages must be between 10 and 5000"],
			max: [5000, "The number of pages must be between 10 and 5000"],
		},
	},
	{
		versionKey: false,
	}
);

BookSchema.plugin(autopopulate);
const Books = mongoose.model("books", BookSchema);

export default Books;
