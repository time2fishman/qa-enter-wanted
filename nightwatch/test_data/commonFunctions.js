const selectors = require('./css_selectors')

const test = (valid, transaction, browser) => {
    //send the fields & data to input
    inputSet(selectors.fields, transaction.fields, browser)
    browser
        //submit
        .click(selectors.buttons.submit)
        .pause(100)
        //expect header to be right
        .expect.element(selectors.messages.header).text.to.equal(transaction.results.header)
    //expect error list to be empty
    if (valid)
        browser.expect.element(selectors.messages.errorList).text.to.equal('')
    else
        messagesCheck(selectors.messages.errorList, transaction.results.errorList, browser)

    //expect query title to be right
    browser.expect.element(selectors.messages.queryTitle).text.to.equal(transaction.results.queryTitle)
    //expect assembled query to be right
    browser.expect.element(selectors.messages.assembledQuery).text.to.equal(transaction.results.assembledQuery)
}

const input = (selector, value, browser) => {
    browser
        .clearValue(selector)
        .setValue(selector, value)
        .expect.element(selector).to.have.value.that.equals(value)
}

const inputSet = (selector_set, value_set, browser) => {
    for (let field in selector_set) {
        if (selector_set.hasOwnProperty(field)) {
            let selector = selector_set[field];
            let value = value_set[field];
            input(selector, value, browser)
        }
    }
}

const messagesCheck = (messageField, message_set, browser) => {
    for (var message_key in message_set) {
        if (message_set.hasOwnProperty(message_key)) {
            var message = message_set[message_key];
            browser.expect.element(messageField).text.to.contain(message)
        }
    }
}

module.exports = {
    //a function accepting arguments to run the tests
    //valid - whether the test should be a valid message
    //transaction - the transaction to test
    test: test,
    //a function to input values into an input text field
    //and check that the value input is accurate before
    //returning
    input: input,
    //will take a set of selectors and values and input all
    //of them, assuming that the key for the selector is the
    //same key as the value
    inputSet: inputSet,
    //will take the field the message(s) should be present in
    //then an object containing all the messages that should
    //be in that field, and then checks for them
    messagesCheck: messagesCheck
}