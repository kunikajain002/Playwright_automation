const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');;
const {CheckoutPage} = require('./CheckoutPage');
const {ThankyouPage} = require('./ThankyouPage');

class POManager
{
    constructor(page, expect)
    {
        this.page = page;
        this.expect = expect;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.checkoutPage = new CheckoutPage(page, expect);
        this.thankyouPage = new ThankyouPage(page, expect);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getThankyouPage()
    {
        return this.thankyouPage;
    }
}

module.exports = {POManager};