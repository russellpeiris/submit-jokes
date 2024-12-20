"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const DBConnect_1 = require("./configs/DBConnect");
const category_routes_1 = require("./routes/category.routes");
const joke_routes_1 = require("./routes/joke.routes");
const environment = process.env.NODE_ENV || 'development';
console.log('environment :', environment);
dotenv_1.default.config({ path: `.env.${environment}` });
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/submit-service/jokes', joke_routes_1.jokesRouter);
app.use('/submit-service/category', category_routes_1.categoryRouter);
(0, DBConnect_1.connectDB)().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
