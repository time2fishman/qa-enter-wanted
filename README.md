<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# AJ's Enter Wanted Test

This protect is to create a web form that will generate the text to submit to the NCIC to add a warrant.

It is assumed that if incorrect entry occurs, the proper error message will be displayed to assist the user in correcting their mistakes.

Development on the application has been focused only on completing the form and validations, stylistic concerns are not being addressed at this time.

### The requirements are as follows for each field, and the results:

<details>

<summary> Enter Wanted Requirements </summary>

<br />

alpha: any alphabetical characters, upper or lower case

numeric: numbers only, 0-9

special: these are any characters other than numbers and letters, including blank spaces ' ' - Periods '.' should not be allowed, as it will break message parsing.

* Header: Required, 9-19 characters in length, any allowed
* MKE: Required, 2-4 alpha/special characters in length
* Originating Agency Identifier: Required, 9 alphanumeric characters in length
* Name: Required, 3-30 characters in length, any allowed
* Sex: Required, 1 character in length, alphabet only, F (female) M (male) and U (unknown) are the only accepted entries
* Race: Required, 1 character in length, alphabet only
* Height: Required, 3 characters in length, numeric only in FII format, where F is feet and I is inches
* Weight: Required, 1-3 characters in length, numeric only in lbs, leading zeros to be entered systematically as necessary to change the length to 3 characters in the assembled query.
* Hair: Required, 3-10 characters in length, alpha only
* Offense: Required, 5-15 characters in length, any allowed
* Date of Warrant/Violation: Required, 8 characters in length, numeric in MMDDYYYY format (allows dates from 1900 to today +1 day, to account for time zone differences)
* Drivers License: Optional, 1-20 characters in length, any characters allowed, if included requires DL State & DL Expiration Year
* DL State: Optional, 2 characters in length, State Abbreviations only, if included requires Drivers License & DL Expiration Year
* DL Expiration Year: Optional, 4 characters in length, numeric in YYYY format, if included requires Drivers License & DL State
* License Plate: Optional, 5-8 alphanumeric characters in length, if included requires License State & License Year
* License State: Optional, 2 characters in length, State Abbreviations only, if included requires License Plate and License Year
* License Year: Optional, 4 characters in length, numeric in YYYY format, if included requires License Plate and License Year

Upon successful entry, a text message will be created, which consists of each of the values entered, separated by a '.' - any optional fields left blank will still be denoted in the message by an additional '.'

</details>

## Automation

It's time to get started on automation!  You've seen a little bit of NightwatchJS in action, docs are available [here](http://nightwatchjs.org/api "NightwatchJS API Docs").

## Step 1

### Summary
We need to create a `nightwatch.conf.js` file for our repository - this is what lets Nighwatch know how to run tests in our repo.

### Instructions
Create the `nightwatch.conf.js` file in the base folder of the `qa-enter-wanted` repostiory.  You can follow the instructions in Nightwatch's [Getting Started guide](http://nightwatchjs.org/gettingstarted "Getting Started"), but I'd recommend the first time through following the solution below.

### Solution

<details>

<summary> <code> nightwatch.conf.js </code> </summary>

<br />

```js
const properties = require('./nightwatchProps')
module.exports = {
    "src_folders" : "nightwatch/tests",    
  
    "selenium" : {
      "start_process" : true,
      "server_path" : properties.resourcePath + properties.seleniumServer,
      "log_path" : "",
      "port" : 4445,
      "cli_args" : {
        "webdriver.chrome.driver" : properties.resourcePath + properties.chromedriver,
      }
    },
  
    "test_settings" : {
      "default" : {
        "launch_url" : "http://localhost",
        "selenium_port"  : 4445,
        "selenium_host"  : "localhost",
        "silent": true,
        "screenshots" : {
          "enabled" : false,
          "path" : ""
        },
        "desiredCapabilities": {
          "browserName": "chrome",
        }
      },
  
      "firefox" : {
        "desiredCapabilities": {
          "browserName": "firefox",
          "marionette": true
        }
      },
  
      "edge" : {
        "desiredCapabilities": {
          "browserName": "MicrosoftEdge"
        }
      }
    }
  }
```

</details>

You may have noticed that the code above pulls information from a separate `nightwatchProps.js` file - this will make it easier to coordinate with our teammates who store their `seleniumServer` and `chromedriver` in different locations.

<details>

<summary> <code> nightwatchProps.js </code> </summary>

<br />

In this file we'll store the path to the `testing-resources` folder you created before, as well as the filenames for your `seleniumServer` and `chromedriver`.

```js
module.exports = {
    resourcePath : "/Users/ajlarson/src/testing-resources/",
    seleniumServer: "selenium-server-standalone-3.6.0.jar",
    chromedriver: "chromedriver"
}
```

Note: For Windows computers, your `resourcePath` will look something like:
```js
    resourcePath : "C:\\Users\\AJ\\src\\testing-resources\\"
```

</details>

## Step 2

### Summary
We need to set up the skeleton for our Nightwatch tests to run.

### Instructions
* Create a folder titled `nightwatch` in the base folder of your repository.
* We'll add our test data and our tests into this folder.
* Make sure that your `nightwatch.conf.js` file points to the tests in your `nightwatch` folder... If you follow the detailed instructions, you'll be set. 

<details>

<summary> Detailed Instructions </summary>

<br />

* In the `nightwatch` folder, create a `test_data` folder.
* Also in the `nightwatch` folder, create a `tests` folder - by default, this is where the `nightwatch.conf.js` in the previous step's solution points.
* In `test_data` create `css_selectors.js` and `test_data.js`
* Each should export an empty object

```js
module.exports = {

}
```

* In the `tests` folder, create a `test.js` file that requires `css_selectors.js` and `test_data.js`

</details>

### Solution

<details>

<summary> <code> css_selectors.js </code> </summary>

<br />

```js
    module.exports = {

    }
```
</details>

<details>

<summary> <code> test_data.js </code> </summary>

<br />

```js
    module.exports = {

    }
```
</details>

<details>

<summary> <code> test.js </code> </summary>

<br />

```js
    const selectors = require('../test_data/css_selectors')
    const data = require('../test_data/test_data')

    module.exports = {
    
    }
```
</details>

## Step 3

### Summary
We need to gather CSS selectors for our tests to use - anything we might need to click, enter data in, or check values for.

### Instructions
* Brainstorm the fields, labels, buttons, values and more that you might need to check for testing the Enter Wanted application.
* For each, use Chrome's Inspector to find the element and build a CSS selector for it.
* Keep in mind, you will need the application running to be able to figure this stuff out.
* Add each selector as a property in the `css_selectors.js` file.

<details>

<summary> Detailed Instructions </summary>

<br />

* If I were to use the Inspector to look at the `hdr` field on the screen, I would see that it was an `input` element, with a unique `name` attribute.  This can be built into a CSS selector: `input[name=hdrInput]`.
* I can add this to the `css_selectors.js` file:

```js
    hdr: 'input[name="hdrInput"]'
```

* I can further sort my selectors into `fields`, `buttons`, and `messages` to make it easier to find the right selector. I do this by creating nested objects for each:

```js
    fields: {
        hdr: 'input[name="hdrInput"]'
    },
    buttons: {

    },
    messages: {

    }
```

* Gather all of the selectors you think you may need.

</details>

### Solution

<details>

<summary> <code> css_selectors.js </code> </summary>

<br />

```js
module.exports = {
    fields: {
        hdr: 'input[name="hdrInput"]',
        mke: 'input[name="mkeInput"]',
        oai: 'input[name="oriInput"]',
        nam: 'input[name="namInput"]',
        sex: 'input[name="sexInput"]',
        rac: 'input[name="racInput"]',
        hgt: 'input[name="hgtInput"]',
        wgt: 'input[name="wgtInput"]',
        hai: 'input[name="haiInput"]',
        off: 'input[name="offInput"]',
        dow: 'input[name="dowInput"]',
        oln: 'input[name="olnInput"]',
        ols: 'input[name="olsInput"]',
        oly: 'input[name="olyInput"]',
        lic: 'input[name="licInput"]',
        liy: 'input[name="liyInput"]',
        lis: 'input[name="lisInput"]'
    },
    buttons: {
        submit: 'button[id="saveBtn"]'
    },
    messages: {
        header: 'p[id="validHeader"]',
        errorList: 'list[id="errorList"]',
        queryTitle: 'span[name="queryTitle"]',
        assembledQuery: 'span[name="queryBody"]'
    }
}
```

</details>

## Step 4

### Summary
Now that we know what fields we want to input data for, what buttons to click, what messages to watch for, we can start gathering test data.

### Instructions
* We'll be populating our `test_data` file now.
* There are numerous ways to organize your test data, but you generally want to track inputs and outputs, for both good and bad data.
* Inputs would be data to enter into fields.
* Outputs would be expected results (in our case message contents)

<details>

<summary> Detailed Instructions </summary>

<br />

You should be familiar with test data that might be required for this application.  The `hdr` field for example, would accept good data of `123456789`.

```js
goodData{
    input: {
        hdr: '123456789',
        mke: 'MKE'
    },
    output: {
        header: 'Valid',
        assembledQuery: '...'
    }
}
```

For every field you are putting information into, add a property to the `input` object, with expected results in the `output` object.

Gathering inputs for another transaction with an error message goes just about the same way.  Each anticipated error message should be contained in it's own property inside of an `errorList` object however. (This can vary project to project, this is how we're tracking it here.)

```js
badData: {
    input: {
        //all the inputs
    },
    output: {
        header: 'Errors Received:',
        errorList: {
            oln: `If Operator's License Number, DL State, or DL Expiration Year are present, all three must be present.`
        },
        queryTitle: 'No results generated due to error.',
        assembledQuery: ''
    }
}
```

For clarity's sake, especially in a test environment like this one that has all the same fields on the screen every time, include EVERY field in your data objects, even if you are going to make them blank.  This will make sure they stay blank.

</details>

### Solution

<details>

<summary> <code> test_data.js </code> </summary>

<br />

module.exports = {
    goodData: {
        input: {
            hdr: '123456789',
            mke: 'MKE',
            oai: 'CHI1234SI',
            nam: 'Harry Dresden',
            sex: 'M',
            rac: 'W',
            hgt: '607',
            wgt: '200',
            hai: 'Brown',
            off: 'Arson',
            dow: '05022016',
            oln: '',
            ols: '',
            oly: '',
            lic: '',
            lis: '',
            liy: ''
        },
        output: {
            header: 'Valid',
            errorList: {},
            queryTitle: 'Assembled Query:',
            assembledQuery: '123456789.MKE.CHI1234SI.Harry Dresden.M.W.607.200.Brown.Arson.05022016......'
        }
    },
    badData: {
        //the 'key' for the fields should match the key of the selectors in css_selectors
        input: {
            hdr: '123456789',
            mke: 'MKE',
            oai: 'CHI1234SI',
            nam: 'Harry Dresden',
            sex: 'M',
            rac: 'W',
            hgt: '607',
            wgt: '200',
            hai: 'Brown',
            off: 'Arson',
            dow: '05022016',
            oln: '12345',
            ols: '',
            oly: '',
            lic: '',
            lis: '',
            liy: ''
        },
        output: {
            header: 'Errors Received:',
            errorList: {
                oln: `If Operator's License Number, DL State, or DL Expiration Year are present, all three must be present.`
            },
            queryTitle: 'No results generated due to error.',
            assembledQuery: ''
        }
    }
}

</details>

## Step 5

### Summary
In this step we will write our first ACTUAL AUTOMATED TEST!

### Instructions
* In the `test.js` file you created before, set it up to navigate to the test URL before each test.
* Also close the browser after the tests are complete.
* We can then add each individual test as a property of the exported object, with the name as the key and the callback test function as the value:

```js
"I am a test" : browser => {
    // every test is passed a "browser" object to interact with
}
```

* Then follow the documentation in the API docs interact with the web page and check results.

<details>

<summary> Detailed Instructions </summary>

In Nightwatch, `beforeEach` as a property key will indicate that it's value is a function that should be ran before EVERY test.  `after` similarly will indicate a function to run after ALL tests are completed.  For our application, the following properties will refresh the browser at the test URL before each test, and only close the browser after all tests are done.

```js
    beforeEach: browser => {
        browser.url('http://localhost:3000')
    },
    after: browser => {
        browser.end()
    }
```

To actually create our first test, we have already gathered fields and inputs for goodData.  We can thus create a test like this:

```js
    'I can put in information and get a good text message as a result' : browser => {

    }
```

In that test we can use our documentation or prior experience to start filling in fields.

```js
    browser
        .clearValue(selectors.fields.hdr)
        .setValue(selectors.fields.hdr, data.goodData.input.hdr)
        .verify.value(selectors.fields.hdr, data.goodData.input.hdr)
```

Clearing any value that might already be in a field is never a bad idea - `setValue` appends the information we put in, so `clearValue` makes sure we're starting from a blank slate.  Then `verify.value` makes sure that the value of the input is indeed what we expectedd.

You might wonder where I got `selectors.fields.hdr` and `data.goodData.input.hdr` -- if you recall, we required the `css_selectors.js` file's export at the top of the `tests.js` file and assigned it to the constant `selectors` - the same for `test_data.js` and `data`.  Just in that one code snipped, we needed the selector 3 times, and the data twice.  Now instead of having to type it in manually ever time, I have variables to reference if ever I need to update my test data.  There are other benefits to this we'll discuss another time!

We'll want to do the same as above for EVERY field, and then we'll click the submit button!

```js
    .click(selectors.buttons.submit)
```

Why didn't I say `browser.click(selectors.buttons.submit)`?  Because as long as I keep interacting with the `browser` object without doing anything else, I can keep chaining commands, it's pretty nice.

```js
browser
    .clearValue(selectors.fields.hdr)
    .setValue(selectors.fields.hdr, data.goodData.input.hdr)
    .verify.value(selectors.fields.hdr, data.goodData.input.hdr)
    //more clears, sets, verifies here
    .click(selectors.buttons.submit)
```

Now we can verify any messages we'd expect to show up after we click submit - we'll wait about a tenth of a second, however, for the page to catch up with our test.

```js
    .pause(100)
    .expect.element(selectors.messages.header).text.to.equal(data.goodData.output.header)
```

Expect is just another way to check our actual results against expected results.  It does break the `browser` chain, so if we wanted to do anything else with the browser we'll have to start it back up.

```js
    .expect.element(selectors.messages.header).text.to.equal(data.goodData.output.header)
browser.expect.element(selectors.messages.errorList).text.to.equal('')
```

Check all the messages that might be important, and you have yourself a working test!

For your badData test, do the same thing as above, using your `data.badData` except that to check the error messages, just check that the whole error message list CONTAINS the text, rather than equals it.

```js
    browser
        .expect.element(selectors.messages.errorList).text.to.contain(data.badData.errorList.oln)
```

</details>

### Solution

<details>

<summary> <code> test.js </code> </summary>

<br />

```js
const selectors = require('../test_data/css_selectors')
const data = require('../test_data/test_data')

module.exports = {
    beforeEach: browser => {
        browser.url('http://localhost:3000')
    },
    after: browser => {
        browser.end()
    },
    'I can put in information and get a good text message as a result' : browser => {
        browser
        //Set ALL the fields (even if I'm setting it to blank, this'll make sure they don't have any info in them)
            .clearValue(selectors.fields.hdr)
            .setValue(selectors.fields.hdr, data.goodData.input.hdr)
            .verify.value(selectors.fields.hdr, data.goodData.input.hdr)
            .clearValue(selectors.fields.mke)
            .setValue(selectors.fields.mke, data.goodData.input.mke)
            .verify.value(selectors.fields.mke, data.goodData.input.mke)
            .clearValue(selectors.fields.oai)
            .setValue(selectors.fields.oai, data.goodData.input.oai)
            .verify.value(selectors.fields.oai, data.goodData.input.oai)
            .clearValue(selectors.fields.nam)
            .setValue(selectors.fields.nam, data.goodData.input.nam)
            .verify.value(selectors.fields.nam, data.goodData.input.nam)
            .clearValue(selectors.fields.sex)
            .setValue(selectors.fields.sex, data.goodData.input.sex)
            .verify.value(selectors.fields.sex, data.goodData.input.sex)
            .clearValue(selectors.fields.rac)
            .setValue(selectors.fields.rac, data.goodData.input.rac)
            .verify.value(selectors.fields.rac, data.goodData.input.rac)
            .clearValue(selectors.fields.hgt)
            .setValue(selectors.fields.hgt, data.goodData.input.hgt)
            .verify.value(selectors.fields.hgt, data.goodData.input.hgt)
            .clearValue(selectors.fields.wgt)
            .setValue(selectors.fields.wgt, data.goodData.input.wgt)
            .verify.value(selectors.fields.wgt, data.goodData.input.wgt)
            .clearValue(selectors.fields.hai)
            .setValue(selectors.fields.hai, data.goodData.input.hai)
            .verify.value(selectors.fields.hai, data.goodData.input.hai)
            .clearValue(selectors.fields.off)
            .setValue(selectors.fields.off, data.goodData.input.off)
            .verify.value(selectors.fields.off, data.goodData.input.off)
            .clearValue(selectors.fields.dow)
            .setValue(selectors.fields.dow, data.goodData.input.dow)
            .verify.value(selectors.fields.dow, data.goodData.input.dow)
            .clearValue(selectors.fields.oln)
            .setValue(selectors.fields.oln, data.goodData.input.oln)
            .verify.value(selectors.fields.oln, data.goodData.input.oln)
            .clearValue(selectors.fields.ols)
            .setValue(selectors.fields.ols, data.goodData.input.ols)
            .verify.value(selectors.fields.ols, data.goodData.input.ols)
            .clearValue(selectors.fields.oly)
            .setValue(selectors.fields.oly, data.goodData.input.oly)
            .verify.value(selectors.fields.oly, data.goodData.input.oly)
            .clearValue(selectors.fields.lic)
            .setValue(selectors.fields.lic, data.goodData.input.lic)
            .verify.value(selectors.fields.lic, data.goodData.input.lic)
            .clearValue(selectors.fields.lis)
            .setValue(selectors.fields.lis, data.goodData.input.lis)
            .verify.value(selectors.fields.lis, data.goodData.input.lis)
            .clearValue(selectors.fields.liy)
            .setValue(selectors.fields.liy, data.goodData.input.liy)
            .verify.value(selectors.fields.liy, data.goodData.input.liy)
        //I've set all the fields, time to submit
            .click(selectors.buttons.submit)
            .pause(100)
        //now I'll check that all the expected results are correct
        browser.expect.element(selectors.messages.header).text.to.equal(data.goodData.output.header)
        browser.expect.element(selectors.messages.errorList).text.to.equal('')
        browser.expect.element(selectors.messages.queryTitle).text.to.equal(data.goodData.output.queryTitle)
        browser.expect.element(selectors.messages.assembledQuery).text.to.equal(data.goodData.output.assembledQuery)
    },
    'If I put in good data, but only one of a set of optional fields, I get an error' : browser => {
        browser
        //Set ALL the fields (even if I'm setting it to blank, this'll make sure they don't have any info in them)
            .clearValue(selectors.fields.hdr)
            .setValue(selectors.fields.hdr, data.badData.input.hdr)
            .verify.value(selectors.fields.hdr, data.badData.input.hdr)
            .clearValue(selectors.fields.mke)
            .setValue(selectors.fields.mke, data.badData.input.mke)
            .verify.value(selectors.fields.mke, data.badData.input.mke)
            .clearValue(selectors.fields.oai)
            .setValue(selectors.fields.oai, data.badData.input.oai)
            .verify.value(selectors.fields.oai, data.badData.input.oai)
            .clearValue(selectors.fields.nam)
            .setValue(selectors.fields.nam, data.badData.input.nam)
            .verify.value(selectors.fields.nam, data.badData.input.nam)
            .clearValue(selectors.fields.sex)
            .setValue(selectors.fields.sex, data.badData.input.sex)
            .verify.value(selectors.fields.sex, data.badData.input.sex)
            .clearValue(selectors.fields.rac)
            .setValue(selectors.fields.rac, data.badData.input.rac)
            .verify.value(selectors.fields.rac, data.badData.input.rac)
            .clearValue(selectors.fields.hgt)
            .setValue(selectors.fields.hgt, data.badData.input.hgt)
            .verify.value(selectors.fields.hgt, data.badData.input.hgt)
            .clearValue(selectors.fields.wgt)
            .setValue(selectors.fields.wgt, data.badData.input.wgt)
            .verify.value(selectors.fields.wgt, data.badData.input.wgt)
            .clearValue(selectors.fields.hai)
            .setValue(selectors.fields.hai, data.badData.input.hai)
            .verify.value(selectors.fields.hai, data.badData.input.hai)
            .clearValue(selectors.fields.off)
            .setValue(selectors.fields.off, data.badData.input.off)
            .verify.value(selectors.fields.off, data.badData.input.off)
            .clearValue(selectors.fields.dow)
            .setValue(selectors.fields.dow, data.badData.input.dow)
            .verify.value(selectors.fields.dow, data.badData.input.dow)
            .clearValue(selectors.fields.oln)
            .setValue(selectors.fields.oln, data.badData.input.oln)
            .verify.value(selectors.fields.oln, data.badData.input.oln)
            .clearValue(selectors.fields.ols)
            .setValue(selectors.fields.ols, data.badData.input.ols)
            .verify.value(selectors.fields.ols, data.badData.input.ols)
            .clearValue(selectors.fields.oly)
            .setValue(selectors.fields.oly, data.badData.input.oly)
            .verify.value(selectors.fields.oly, data.badData.input.oly)
            .clearValue(selectors.fields.lic)
            .setValue(selectors.fields.lic, data.badData.input.lic)
            .verify.value(selectors.fields.lic, data.badData.input.lic)
            .clearValue(selectors.fields.lis)
            .setValue(selectors.fields.lis, data.badData.input.lis)
            .verify.value(selectors.fields.lis, data.badData.input.lis)
            .clearValue(selectors.fields.liy)
            .setValue(selectors.fields.liy, data.badData.input.liy)
            .verify.value(selectors.fields.liy, data.badData.input.liy)
        //I've set all the fields, time to submit
            .click(selectors.buttons.submit)
            .pause(100)
        //now I'll check that all the expected results are correct
        browser.expect.element(selectors.messages.header).text.to.equal(data.badData.output.header)
        //this transaction only has one error message to check, so I don't need to repeat the check
        browser.expect.element(selectors.messages.errorList).text.to.contain(data.badData.output.errorList.oln)
        browser.expect.element(selectors.messages.queryTitle).text.to.equal(data.badData.output.queryTitle)
        browser.expect.element(selectors.messages.assembledQuery).text.to.equal(data.badData.output.assembledQuery)
    }
}
```

</details>

## Step 6 -- Keep Going!

### Summary
Good job!  Now you have more work...

### Instructions
If you've been able to get the previous two tests to run by using copy/paste from the solutions, go back and put in the info yourself!  It's good practice.

Once you get to where you are confident you can reproduce the single good data test and the single bad data test outlined above, try making more tests!
* More data sets (More valid transactions, different error messages, etc)
* Different functionality (Clear button?!?)

### Black Diamond Challenge

Write up a helper function that will simplify data input...

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>