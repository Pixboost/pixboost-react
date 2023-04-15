# UI Tests

Running react app that using pixboost-react library and running webdriver.io tests against it.

Running tests require Node version 10, and they don't work with 12 or 14.

## How to run

* Start the app
    * `cd app`
    * `npm install`
    * `npm start`
* Run the tests
    * `cd tests`
    * `npm install`
    * `npm run selenium-install` (only once)
    * `npm run start-selenium`
    * `npm test`

Tests are using screenshot testing. Run below command from tests/ dir to update reference screenshots:

* `npm run update`

Test report is generated in the hermione/reports folder.