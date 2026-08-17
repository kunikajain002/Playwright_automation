// const {LoginPage} = require('./LoginPage');
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CheckoutPage} from './CheckoutPage';
import {ThankyouPage} from './ThankyouPage';
import {Expect, Page} from '@playwright/test';

export class POManager
{
    // here the Class object will go not type locator and type page
    loginPage : LoginPage;
    dashboardPage: DashboardPage;
    checkoutPage: CheckoutPage;
    thankyouPage: ThankyouPage;
    page: Page;
    expect: Expect;
    
    constructor(page:any , expect: any )
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
