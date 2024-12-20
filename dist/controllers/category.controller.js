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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJokeCategories = exports.addCategory = void 0;
const axios_1 = __importDefault(require("axios"));
const category_model_1 = require("../models/category.model");
const dotenv_1 = __importDefault(require("dotenv"));
const environment = process.env.NODE_ENV || 'development';
console.log('environment :', environment);
dotenv_1.default.config({ path: `.env.${environment}` });
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.body;
    try {
        const newCategory = new category_model_1.Category({ category });
        const deliverResponse = yield axios_1.default.post(`${process.env.DELIVER_SERVICE_URL}/deliver-service/category`, {
            category,
        });
        if (deliverResponse.status == 201) {
            yield newCategory.save();
            res.status(201).json(category);
        }
    }
    catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
});
exports.addCategory = addCategory;
const getJokeCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.Category.find().select('category -_id');
        const categoryNames = categories.map((cat) => cat.category);
        res.status(200).json(categoryNames);
    }
    catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
});
exports.getJokeCategories = getJokeCategories;
