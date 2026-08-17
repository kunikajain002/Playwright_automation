import {test, expect} from '@playwright/test';
import { POManager } from '../pageObject_ts/POManager';

// its same for js and ts
const dataset = JSON.parse(JSON.stringify(require("../data/data.json"))); 

import {customTest} from '../data/test-base';

// Practice test
for (const data of dataset) {
    test(`Client App Login for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page, expect);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.email, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.checkOut(data.email, data.productName);

        const thankyouPage = poManager.getThankyouPage();
        await thankyouPage.thankyouPage();

    });
}

    // test data can be go as fixture 
customTest("Client App Login", async ({page, testDataForOrder})=> 
// test("Client App Login", async ({page, testDataForOrder})=> 
{
    const poManager = new POManager(page, expect);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.checkOut(testDataForOrder.email, testDataForOrder.productName);

        const thankyouPage = poManager.getThankyouPage();
        await thankyouPage.thankyouPage();
})

// cmd = npx playwright test tests/ClientAppPO.spec.ts