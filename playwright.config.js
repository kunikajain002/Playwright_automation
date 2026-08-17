// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';

// this is the configuration file

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config =({
  testDir: './tests', // what file to run

  // this is run in congif level to retry the failed test cases
  reties: 1, // retry times is given 

  // parallel executions handler
  workers: 3,

  timeout: 50 *1000, // wait time its in mili-seconds

  expect: {
    timeout: 5000, // auto retrying assertions (wait for assertion)
  },
  reporter: 'html',

  // projects : [
  //   {
  //     name : 'projectTest1',
  //     use : {
  //       browserName: 'chromium',
  //       headless: false,
  //       acceptDownloads: true,
  //       actionTimeout: 10 * 1000, // for action button
  //       navigationTimeout: 30 * 1000, // for goto/navigation actions

  //       screenshot : 'on', 
  //       trace : 'retain-on-failure'
  //     },
  //   },
  //   {
  //     name : 'projectTest2',
  //     use : {
  //       browserName: 'chromium',
  //       headless: false,
  //       acceptDownloads: true,
  //       actionTimeout: 10 * 1000, // for action button
  //       navigationTimeout: 30 * 1000, // for goto/navigation actions

  //       screenshot : 'on', 
  //       trace : 'retain-on-failure'
  //     },
  //   }
  // ]

  use: {
    // Core Property
    browserName: 'chromium',
    headless: false,
    acceptDownloads: true,
    actionTimeout: 10 * 1000, // for action button
    navigationTimeout: 30 * 1000, // for goto/navigation actions

    screenshot : 'on', // to take screenshot on every step
    
    // trace : 'on', // to trace and give zip file of every test file
    // it has on/off/retain-on-failure
    trace : 'retain-on-failure', // this is only give trace when test is failed 
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    // with this we can tell script to have this much width and height for the browser
    // you can have default too, this is not default
    // viewport : {width:720, height: 720},

    // we can only use one from viewport or devices

    // can give any device
    // ...devices['iPhone 11'],


    // ssl certification error
    ignoreHttpsErrors: true,

    // allow to handle permissions for location or somthing
    permissions: ['geolocation'],

    // video for failure
    // on, off, retain-on-failure, on-first-retry
    video : 'retain-on-failure',
    
  },

});
module.exports = config
// export default defineConfig({}) = const config ({})module.export = config
