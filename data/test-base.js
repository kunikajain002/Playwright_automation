"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customTest = void 0;
var test_1 = require("@playwright/test");
exports.customTest = test_1.test.extend(
// exports.test = base.test.extend(
{
    testDataForOrder: {
        productName: "ZARA COAT 3",
        email: "kunikajain27@gmail.com",
        password: "Kunikajain@02"
    }
});
