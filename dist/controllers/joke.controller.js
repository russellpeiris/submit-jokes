"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextUnmoderatedJoke = exports.deleteJoke = exports.addJoke = void 0;
const joke_model_1 = require("../models/joke.model");
const getNextUnmoderatedJoke = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const joke = yield joke_model_1.Joke.findOne({ status: 'unmoderated' });
        if (!joke) {
            res.status(200).json('No jokes to moderate');
            return;
        }
        res.status(200).json(joke);
    }
    catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
});
exports.getNextUnmoderatedJoke = getNextUnmoderatedJoke;
const addJoke = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { joke, category } = req.body;
    try {
        const newJoke = new joke_model_1.Joke({ joke, category });
        yield newJoke.save();
        res.status(201).json(newJoke);
    }
    catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
});
exports.addJoke = addJoke;
const deleteJoke = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const joke = yield joke_model_1.Joke.findOneAndDelete({ jokeId: id });
        if (!joke) {
            res.status(404).json('Joke not found');
            return;
        }
        res.status(200).json(joke);
    }
    catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
});
exports.deleteJoke = deleteJoke;
