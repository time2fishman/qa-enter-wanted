const functions = require('../test_data/commonFunctions')
const selectors = require('../test_data/css_selectors')
const data = require('../test_data/test_data')

module.exports = {
    beforeEach: browser => {
        browser.url('http://localhost:3000')
    },
    after: browser => {
        browser.end()
    },
    'I can put data in the fields and generate a result' : browser => {
        functions.test(true, data.transactions.minimumEntry, browser)
    },
    'I can put only the oln and get an error about other fields' : browser => {
        functions.test(false, data.transactions.olnOnly, browser)
    },
    'I can enter oln + oly and get a message that I need all the oln fields' : browser => {
            //set the transaction from your data file
        let transaction = data.transactions.noOlnEntry
            //send the fields & data to input
        functions.inputSet(selectors.fields, transaction.fields, browser)
        browser
            //submit
            .click(selectors.buttons.submit)
            .pause(100)
            //expect header to be right
            .expect.element(selectors.messages.header).text.to.equal(transaction.results.header)
            //expect error list to contain all the right errors
        functions.messagesCheck(selectors.messages.errorList, transaction.results.errorList, browser)
            //expect query title to be right
        browser.expect.element(selectors.messages.queryTitle).text.to.equal(transaction.results.queryTitle)
            //expect assembled query to be right
        browser.expect.element(selectors.messages.assembledQuery).text.to.equal(transaction.results.assembledQuery)
    },
    'Entering the minimum AND all three oln fields generates a blob successfully' : browser => {
            //set the transaction from your data file
        let transaction = data.transactions.olnFields
            //send the fields & data to input
        functions.inputSet(selectors.fields, transaction.fields, browser)
        browser
            //submit
            .click(selectors.buttons.submit)
            .pause(100)
            //expect header to be right
            .expect.element(selectors.messages.header).text.to.equal(transaction.results.header)
            //expect error list to contain all the right errors
        functions.messagesCheck(selectors.messages.errorList, transaction.results.errorList, browser)
            //expect query title to be right
        browser.expect.element(selectors.messages.queryTitle).text.to.equal(transaction.results.queryTitle)
            //expect assembled query to be right
        browser.expect.element(selectors.messages.assembledQuery).text.to.equal(transaction.results.assembledQuery)
    }
}