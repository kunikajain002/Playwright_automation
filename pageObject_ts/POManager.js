"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POManager = void 0;
// const {LoginPage} = require('./LoginPage');
var LoginPage_1 = require("./LoginPage");
var DashboardPage_1 = require("./DashboardPage");
var CheckoutPage_1 = require("./CheckoutPage");
var ThankyouPage_1 = require("./ThankyouPage");
var POManager = /** @class */ (function () {
    function POManager(page, expect) {
        this.page = page;
        this.expect = expect;
        this.loginPage = new LoginPage_1.LoginPage(page);
        this.dashboardPage = new DashboardPage_1.DashboardPage(page);
        this.checkoutPage = new CheckoutPage_1.CheckoutPage(page, expect);
        this.thankyouPage = new ThankyouPage_1.ThankyouPage(page, expect);
    }
    POManager.prototype.getLoginPage = function () {
        return this.loginPage;
    };
    POManager.prototype.getDashboardPage = function () {
        return this.dashboardPage;
    };
    POManager.prototype.getCheckoutPage = function () {
        return this.checkoutPage;
    };
    POManager.prototype.getThankyouPage = function () {
        return this.thankyouPage;
    };
    return POManager;
}());
exports.POManager = POManager;
