const playwright = require('@playwright/test')
const { POManager } = require('../../pageObject_ts/POManager');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// before each 
Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    // from this keyword we can attach this page to entire step.js
    this.page = await context.newPage();

    // this keyword is a world constructor
    this.poManager = new POManager(this.page, expect);
});

// BeforeALL - onlyonces


// before each
BeforeStep( function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

// after all step
AfterStep(async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path: 'screenshot1.png'});
  }
});


// this runs at the end
After(function () {
  // Assuming this.driver is a selenium webdriver
  console.log("The END");
});