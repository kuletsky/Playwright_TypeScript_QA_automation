// @ts-check
const { defineConfig, devices } = require('@playwright/test');
<<<<<<< HEAD
=======
// const isCI = process.env.CI === 'true';
>>>>>>> d5740918f8477371414db46b5e0cdbc2f55cb35c

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
<<<<<<< HEAD
  forbidOnly: !!process.env.CI,
=======
  
  forbidOnly: !!process.env.CI,
  // forbidOnly: isCI,

>>>>>>> d5740918f8477371414db46b5e0cdbc2f55cb35c
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
<<<<<<< HEAD
=======

    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
>>>>>>> d5740918f8477371414db46b5e0cdbc2f55cb35c
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
<<<<<<< HEAD
    trace: 'on-first-retry',
    headless: false,
=======
    trace : 'retain-on-failure',
>>>>>>> d5740918f8477371414db46b5e0cdbc2f55cb35c
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
<<<<<<< HEAD
    }

=======
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
>>>>>>> d5740918f8477371414db46b5e0cdbc2f55cb35c

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

