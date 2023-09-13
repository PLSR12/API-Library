import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
	validator: (value: string) => value.trim() !== "",
	message: ({ path }: { path: string }) => `${path} is required`,
});
