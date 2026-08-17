const {test, expect} = require('@playwright/test');

// Practice test
test.only('Practice Playwright Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    console.log(await page.title());
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3"
    const email = "kunikajain27@gmail.com"
    // await page.locator(".text-reset").click();
    // await page.locator("#firstName").fill("Kunika");
    // await page.locator("#lastName").fill("Jain");
    // await page.locator("#userEmail").fill("kunikajain27@gmail.com");
    // await page.locator("#userMobile").fill("1234567891");
    // await page.locator("div select").click();
    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('ArrowDown');
    // await page.locator("[value='Female']").click();
    // await page.locator("#userPassword").fill("Kunikajain@02");
    // await page.locator("#confirmPassword").fill("Kunikajain@02");
    // await page.locator("[type='checkbox']").click();
    // await page.locator('#login').click();

    // await page.locator("div button").click();

    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Kunikajain@02");
    await page.getByRole("button", {name:'Login'}).click();
    
    // we use .waitForLoadState() to wait till every api calls are completed
    await page.waitForLoadState('networkidle');
    
    // this will wait for 1 element and fails for multiple
    // await page.locator(".card-body b").waitFor();
    await page.locator(".card-body b").first().waitFor();

    // this is chain method
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:' Add To Cart'}).click();

    await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();
    await page.locator("div li").first().waitFor();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button",{name: 'Checkout'}).click();
    await page.locator("input[type='text']").nth(1).fill("123");
    await page.locator("input[type='text']").nth(2).fill("kunika jain");
    await page.locator("input[type='text']").nth(3).fill("rahulshettyacademy");
    await page.getByRole("button",{name:'Apply Coupon'}).click();   
    await expect(page.getByText("* Coupon Applied")).toBeVisible();
    // .pressSequentially() enter words one by one  
    await page.getByPlaceholder("Select Country",{name:'Country'}).pressSequentially('ind', {delay: 100});

    await page.getByRole("button", {name:"India"}).nth(1).click();

    await expect(page.getByText("kunikajain27@gmail.com")).toBeVisible();

    await page.getByText("Place Order ").click();

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    const orderID = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent())?.split("|")[1].trim();
    console.log(orderID);

    await page.getByText("Orders History Page").click();

    await page.locator("tbody tr").filter({hasText: orderID}).getByRole("button",{name:'View'}).click();

    await expect(page.getByText(orderID)).toBeVisible();

    await page.pause();


});