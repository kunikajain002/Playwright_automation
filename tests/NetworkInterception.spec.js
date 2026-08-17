const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayLoad = {
    // in JS we don't have comas in keys
    userEmail: "kunikajain27@gmail.com",
    userPassword: "Kunikajain@02"
}
const orderPayLoad = {
    "orders": [
        {
            "country": "India",
            "productOrderedId": "6960eac0c941646b7a8b3e68"
        }
    ]
}
let response;
const fakePayLoadOrders = { data: [], message: "No Orders" };


// this will run before all the test cases
test.beforeAll(async () => {
    // from request we call the apis, 
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});

// this will run in between all the test cases 
test.beforeEach(() => {

});


test('Client App Login Test', async ({ page }) => {
    // here addInitScript() is called to add the token value in the localstorage
    // so here first 'value' part is the function and other one is Parameter
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    // console.log(await page.title());

    // we use * instead of the api end-point, that say we can have any account but the moment we have this api, we need the response
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            // we cannot fake the server response, so we have to take the real response
            // we are fetching the response
            const response = await page.request.fetch(route.request());

            // Important Step
            // this will convert javascript object into json string
            let body = JSON.stringify(fakePayLoadOrders);

            // this will give the response to browser and in this we fake the response
            route.fulfill(
                {
                    // in fulfill we have to send all the content of the response, so we are giving the same response which we have and faking the body 
                    response,
                    body,
                }
            );
            // Intercepting response - API response ->{ playwright fake response }-> browser -> render data on Front End
        }
    );

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
    // await page.pause();




});