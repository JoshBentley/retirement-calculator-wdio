A simple automation framework utilizing WebdriverIO to automate the Retirement Calculator for Securian.
https://www.securian.com/insights-tools/retirement-calculator.html

To run the tests first install all node packages
`npm install`

Then run the tests with the command `npm run wdio`

Tests will be reported in the console

If you would like to run the tests in a non headless browser remove the `--headless` option from the driver capabilities in the `wdio.conf.js` file
