const {test, expect} = require('@playwright/test');
// test.describe.configure({mode:'serial'});

test("@Web Popup validation", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack(); // its a browser back click
    // await page.goForward(); // its a browser forward click


    // from this we can check if the element is hidden 
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#confirmbtn").click();

    // Popups
    await page.on('dialog', dialog => dialog.accept()); // to click ok
    // await page.on('dialog', dialog => dialog.dismiss()); // to click cancel

    // Hover
    await page.locator("#mousehover").hover();

    // switching child frame (iframe)
    const framepage = page.frameLocator("#courses-iframe");
    await framepage.locator("li a[href='lifetime-access']:visible").click();
    const text = await framepage.locator(".text h2").textContent();
    console.log(text)
    console.log(text.split(" ")[1]); // this will split in space and give you the array
});


test("@Web Screenshots & Visual Comparision", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();

    // for partial element screenshot
    await page.locator("#displayed-text").screenshot({path: "partialScreenshot.png"});

    // for full page screenshot
    await page.screenshot({path:"Screenshot.png"});

    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
})


test("@Web Visal testing", async({page})=>
{
    await page.goto("https://edly.com/");

    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})