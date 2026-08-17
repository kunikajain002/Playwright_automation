const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const loginPayLoad = {
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

// this will run before all the test cases
test.beforeAll( async ()=> 
{
    // from request we call the apis, 
    const apiContext = await request.newContext();

    // // here we are storing the response and status 
    // const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    //     {
    //         data: loginPayLoad
    //     })

    // // from this ok() it will check if the response or status is OK or not ex: 200, 201
    // await expect(loginResponse.ok()).toBeTruthy(); 

    // // here we need to have the response in json
    // const loginResponseJson = await loginResponse.json(); 

    // // here we are storing token from the response 
    // // here we don't need await because we are just parsing it
    // token = loginResponseJson.token;
    // console.log(token);

    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});

// this will run in between all the test cases 
test.beforeEach( ()=>
{

});


test('Client App Login Test', async ({page})=>
{   
    // here addInitScript() is called to add the token value in the localstorage
    // so here first 'value' part is the function and other one is Parameter
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    
    await page.goto("https://rahulshettyacademy.com/client/");

    // console.log(await page.title());

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();
    const column = await page.locator("tbody tr");
    // console.log(row);
    
    for (let i = 0; i<await column.count(); ++i)
    {   
        const rowOrderid = await column.locator("th").nth(i).textContent();
        if(response.orderID.includes(rowOrderid))
        {
            await column.locator("button").first().click();
            break;
        }
    }

    const orderDetailsID = await page.locator(".col-text").first().textContent();
    expect(response.orderID.includes(orderDetailsID)).toBeTruthy();

    await page.pause();


});