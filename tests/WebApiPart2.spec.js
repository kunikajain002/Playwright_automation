const {test, expect} = require('@playwright/test');

let webContext;

// here borwser is a fixture
test.beforeAll(async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("kunikajain27@gmail.com");
    await page.locator("[type='password']").fill("Kunikajain@02");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');

    // the storage will save from browser level, 
    // the storage will save in the json file and when running the script this will create the state.json file automatically.
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
})


// Practice test
test('@Web Practice Playwright Test', async ()=>
{
    const page = await webContext.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3"
    const email = "kunikajain27@gmail.com"

    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());

    const count = await products.count();
    for(let i=0; i<count; ++i)
    {
        // Here we use .locator() to search the title of the product, here the locator will only search the child of class = card-body, not from the whole DOM
        // this is called dynamically searching
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            // add to cart logic
            // console.log(await products.nth(i).locator("b").textContent());
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink= '/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();

    // search from the cart 
    // this is the another method to find the text name, here write tagname:has-text('') this is sudo-class method
    // .isVisible() checks if the method is visible or not on the page, it returs boolean value, it does not have auto-wait
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    // we cannot use text all the time, it should be unique
    await page.locator("text=Checkout").click();
    await page.locator("input[type='text']").nth(1).fill("123");
    await page.locator("input[type='text']").nth(2).fill("kunika jain");
    await page.locator("input[type='text']").nth(3).fill("rahulshettyacademy");
    await page.locator("div button").click();   
    await page.locator("text=* Coupon Applied").waitFor();
    // .pressSequentially() enter words one by one  
    await page.locator("[placeholder*='Country']").pressSequentially('ind', {delay: 100});

    // because we want to search in that section only
    const dropdown = await page.locator(".ta-results").first();
    await dropdown.waitFor();
    const optionsCounts = await dropdown.locator("button").count();
    // console.log(optionsCounts);
    for (let i = 0; i < optionsCounts; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        // console.log(text);
        if(text === " India") // to get rid of space before india use text.trim() === "India" or text.includes("India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name label")).toHaveText(email);

    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    await page.locator("label[routerlink='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();
    const column = await page.locator("tbody tr");
    // console.log(row);
    
    for (let i = 0; i<await column.count(); ++i)
    {   
        const rowOrderid = await column.locator("th").nth(i).textContent();
        if(orderID.includes(rowOrderid))
        {
            await column.locator("button").first().click();
            break;
        }
    }

    const orderDetailsID = await page.locator(".col-text").first().textContent();
    expect(orderID.includes(orderDetailsID)).toBeTruthy();

});

test('@Web title printing', async ()=>
{
    const page = await webContext.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
})

// webapi part 2