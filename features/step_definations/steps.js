const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObject_ts/POManager');
// const { POManager } = require('../../pageObject/POManager');

const { expect } = require('@playwright/test');
const playwright = require('@playwright/test')

// cucumber by default takes 5s timeout 

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (email, password) {

  // const browser = await playwright.chromium.launch({headless: false});
  // const context = await browser.newContext();
  // const page = await context.newPage();

  // // this keyword is a world constructor
  // this.poManager = new POManager(page, expect);
  this.loginPage = this.poManager.getLoginPage();
  await this.loginPage.goTo();
  await this.loginPage.validLogin(email, password);
});

When('Add {string} to cart', { timeout: 100 * 1000 }, async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
});

Then('the {string} and Verify {string} is displayed in the cart', { timeout: 100 * 1000 }, async function (email, productName) {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToCart();
  this.checkoutPage = this.poManager.getCheckoutPage();
  await this.checkoutPage.checkOut(email, productName);
});

// When('enter valid details and place the Order', function () {
//   // Write code here that turns the phrase above into concrete actions

// });

Then('Enter valid details and Verify order in present in the OrderHistory', { timeout: 100 * 1000 }, async function () {
  // Write code here that turns the phrase above into concrete actions
  this.thankyouPage = this.poManager.getThankyouPage();
  await this.thankyouPage.thankyouPage();
});

// we need to exit with the cucumber block with, ctrl+c and npx cucumber-js --exit
// to exit the code after execution

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // here we open URL
  console.log(await this.page.title());

  // we can use CSS (playwright only supports CSS selector) and XPATH (rearly, not suggested)
  await this.page.locator("#username").fill(username);
  await this.page.locator("[type='password']").fill(password);
  await this.page.locator("[type='submit']").click();

});

Then('Verify Error message is displayed', async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});

