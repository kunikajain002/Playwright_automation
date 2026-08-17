const { test, expect } = require('@playwright/test');
const { request } = require('node:http');
// const { test, expect, request } = require('@playwright/test');

test("Security Test Request Intercept", async ({ page }) => {
    // login and order page
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    console.log(await page.title());
    const products = page.locator(".card-body");
    const email = "kunikajain27@gmail.com"
    await page.locator("#userEmail").fill(email);
    await page.locator("[type='password']").fill("Kunikajain@02");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a6c37bb85b8849b491eb21b" }));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me").first()).toHaveText("You are not authorize to view this order");
    // await page.pause();

});

test.only("Api call abort", async ({ page }) => {
    // login and order page

    // this we need to call before the page
    // await page.route('**/*.css', route => route.abort());

    // any event occurs
    await page.on('request',request=> console.log(request.url()));
    await page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.pause();

    await page.locator("#username").fill("Admin");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("[type='submit']").click();

});