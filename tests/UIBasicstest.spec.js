// this test launches the browser and provide a fresh page
const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');

// This is a Test Case called test annotation
test('Browser Context Playwright test', async ({browser})=>
{
    // playwright automation code--
    // javascript is asynchronous (it will not call code line by line it can call it any step)
    // u have explicity say to javascript to wait on every step here we use: await
    // await
    // Here await only works when we use async in function 
    // here we use function() is function has no name so in newer version of javascript we use ()=> (same like function() with no name)
    // Here our fixture is browser and this is a playwright feature, we use cruly braces so that playwright will recognise it as a fixture
    // Chrome - have plugins/cookies that why we need to make fresh constant to execute the chrome browser

    // the next 2 line we don't need to explicitly write this we can simply do ({browser, page})=>
    const context = await browser.newContext(); // the is fresh constant, newContext() tells browser to start new instance with some fixative properties
    const page = await context.newPage(); // Here we open a new page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // here we open URL
    console.log(await page.title());

    // we can use CSS (playwright only supports CSS selector) and XPATH (rearly, not suggested)
    await page.locator("#username").fill("Admin");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("[type='submit']").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')

    // clearing the existing information
    await page.locator("#username").fill("");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();
    
    // instead of textContent() there is inputValue()
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent()); // it works like arrays and give 2nd element

    // all the elements 
    console.log(await page.locator(".card-body a").allTextContents());

});

// use test.only('') it will only run this test case
// test: the playwright feature; 'Page PlayWright test': title, ()=>: function, {page}: fixture
test('Page PlayWright test', async ({page})=>
{
    // Here page will work line context and page lines above
    await page.goto("https://www.google.com/");

    // get the title and put assertion 
    console.log(await page.title());

    // expect (playwright have this) = assertion
    await expect(page).toHaveTitle("Google");

});

test('UI Control', async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // here we open URL
    console.log(await page.title());
    const documentLink = page.locator("[href*='documents-request']");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    
    // dropdown
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    // it got pause and opens the playwright inspector
    // await page.pause();

    // radio buttons
    await page.locator('.radiotextsty').nth(1).click();
    await page.locator("#okayBtn").click()

    // assertion
    console.log(await page.locator('.radiotextsty').nth(1).isChecked());
    await expect(page.locator('.radiotextsty').nth(1)).toBeChecked();
    // await page.pause();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    // we cam uncheck it with .uncheck()
    await page.locator("#terms").uncheck();

    // assertion and .toBeFalsy() for having the false value
    // console.log(await page.locator("#terms").isChecked());
    // Here we use the await inside the expect block because await is only used where the action is taken.
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class","blinkingText");
});

test.only('Child windows handle', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // here we open URL
    console.log(await page.title());
    const documentLink = page.locator("[href*='documents-request']");

    // here promise.all() waits to run all the promise code inside it then it goes to the another step.
    // It is like an array, after const we use [] told playwright that these are my promises which have to be fullfilles.
    // Click is just a function its not a promise
    const [newPage] = await Promise.all( 
    [
        context.waitForEvent('page'), // listen for any new page promise: pending, rejected, fulfilled
        documentLink.click(), // new page opens
    ]);

    const text = await newPage.locator(".red").first().textContent(); // output: Please email us at mentor@rahulshettyacademy.com with below template to receive response 
    const arrayText = text.split("@") // we are spliting via @ then we have array or [0th,1th] index
    const domain = arrayText[1].split(" ")[0] // here we are spliting for widespace with array [0th,1th] index
    // console.log(domain);

    await page.locator("#username").fill(domain);
    await page.pause();

    // the textContent() is used only when the element is attached to the DOM like "Please email us at mentor@rahulshettyacademy.com with below template to receive response"
    // but in the input tag it is not into the DOM, so it will not print that why we use inputValue()
    console.log(await page.locator("#username").inputValue());




    
    
});