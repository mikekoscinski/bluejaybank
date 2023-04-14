"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 5000;
/**
 * TODO:
 *    v1/accounts
 *    v1/accounts/{id}
 *    v1/accounts/{id}/
 *
 *    v1/transfer
 *    v1/balance
 *    v1/
 */
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/accounts', function (req, res) {
    res.send('List of accounts');
});
app.listen(port, function () {
    return console.log("Express is listening at http://localhost:".concat(port, "!"));
});
