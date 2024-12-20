"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joke = void 0;
const mongoose_1 = require("mongoose");
const jokesSchema = new mongoose_1.Schema({
    jokeId: {
        type: String,
        required: true,
        default: () => new mongoose_1.Types.ObjectId().toString(),
    },
    joke: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    submissionDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 'unmoderated',
    },
});
exports.Joke = (0, mongoose_1.model)('Joke', jokesSchema);
