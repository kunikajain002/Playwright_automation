const {test, expect} = require('@playwright/test');

test('Playwright Special locators', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    // from this getbyLabel() we can click on text for checkboxes and ratio buttons 
    // but it should be a label tag
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();

    // we use this selectOptoion() which have select tag only
    // getByLabel() is associate when <label><input></label> is there or 
    // <label for='id'></label> <input id='id'></input> for matches
    await page.getByLabel("Gender").selectOption("Female");

    // we use this getByPlaceholder() when we have attribute placeholder
    await page.getByPlaceholder("Password").fill("abc123");

    // we use getByRole() to use the tag name and then the name of that tag like button name is submit
    // if we have input tag and have 'btn' there so we can use getByRole()
    // await page.getByRole("button", {name:'Submit'}).click();

    // await page.locator("[type='submit']").click();
    await page.getByRole("button", {name:'Submit'}).click()

    // we use this getbytext() scan the entire page and spot and get the text
    const text = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    // an expected value is visible, if not it will fail does not give boolean value, it fails the test
    // the expect has the timeout of 5 sec but this .toBeVisible() is has its own {timeout: 10000} it can overwrite
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000});
    
    // const text = await page.locator("text=Success!").isVisible();
    console.log(text);
    // await page.pause();

    await page.locator("text=Shop").click();

    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button",{name:'Add '}).click();





    
})


test('Playwright test level timeout', async ({page})=>
{
    // this is test level timeout
    test.setTimeout(6000);

    // from this we can overwrite the expect timeout in this test level only
    const slowExpect = expect.configure({timeout:9000});

    // this is for action buttons like click(), fill() and all
    page.setDefaultTimeout(9000);
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");

    // with we have this on step level so it will overwrite the given timeout and using only 15s timeout
    await page.locator("[type='submit']").click({timeout:15000});
    const text = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000});
    
    console.log(text);
    await page.locator("text=Shop").click();

    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button",{name:'Add '}).click();
    




    
})