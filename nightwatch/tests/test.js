const selectors = require('../test_data/css_selectors')
const data = require('../test_data/test_data')
const functions = require('../test_data/test_functions')

module.exports = {
    beforeEach: browser => {
        browser.url('http://localhost:3000')
    },
    after: browser => {
        browser.end()
    },
    'I can put in information and get a good text message as a result': browser => {

        //Set ALL the fields (even if I'm setting it to blank, this'll make sure they don't have any info in them)
        functions.enterValue(selectors.fields.hdr, data.goodData.input.hdr, browser)
        functions.enterValue(selectors.fields.mke, data.goodData.input.mke, browser)
        functions.enterValue(selectors.fields.oai, data.goodData.input.oai, browser)
        functions.enterValue(selectors.fields.nam, data.goodData.input.nam, browser)
        functions.enterValue(selectors.fields.sex, data.goodData.input.sex, browser)
        functions.enterValue(selectors.fields.rac, data.goodData.input.rac, browser)
        functions.enterValue(selectors.fields.hgt, data.goodData.input.hgt, browser)
        functions.enterValue(selectors.fields.wgt, data.goodData.input.wgt, browser)
        functions.enterValue(selectors.fields.hai, data.goodData.input.hai, browser)
        functions.enterValue(selectors.fields.off, data.goodData.input.off, browser)
        functions.enterValue(selectors.fields.dow, data.goodData.input.dow, browser)
        functions.enterValue(selectors.fields.oln, data.goodData.input.oln, browser)
        functions.enterValue(selectors.fields.ols, data.goodData.input.ols, browser)
        functions.enterValue(selectors.fields.oly, data.goodData.input.oly, browser)
        functions.enterValue(selectors.fields.lic, data.goodData.input.lic, browser)
        functions.enterValue(selectors.fields.lis, data.goodData.input.lis, browser)
        functions.enterValue(selectors.fields.liy, data.goodData.input.liy, browser)
        //I've set all the fields, time to submit
        browser
            .click(selectors.buttons.submit)
            .pause(100)
        //now I'll check that all the expected results are correct
        browser.expect.element(selectors.messages.header).text.to.equal(data.goodData.output.header)
        browser.expect.element(selectors.messages.errorList).text.to.equal('')
        browser.expect.element(selectors.messages.queryTitle).text.to.equal(data.goodData.output.queryTitle)
        browser.expect.element(selectors.messages.assembledQuery).text.to.equal(data.goodData.output.assembledQuery)
    },
    'If I put in good data, but only one of a set of optional fields, I get an error': browser => {
        //Set ALL the fields (even if I'm setting it to blank, this'll make sure they don't have any info in them)
        functions.enterValue(selectors.fields.hdr, data.badData.input.hdr, browser)
        functions.enterValue(selectors.fields.mke, data.badData.input.mke, browser)
        functions.enterValue(selectors.fields.oai, data.badData.input.oai, browser)
        functions.enterValue(selectors.fields.nam, data.badData.input.nam, browser)
        functions.enterValue(selectors.fields.sex, data.badData.input.sex, browser)
        functions.enterValue(selectors.fields.rac, data.badData.input.rac, browser)
        functions.enterValue(selectors.fields.hgt, data.badData.input.hgt, browser)
        functions.enterValue(selectors.fields.wgt, data.badData.input.wgt, browser)
        functions.enterValue(selectors.fields.hai, data.badData.input.hai, browser)
        functions.enterValue(selectors.fields.off, data.badData.input.off, browser)
        functions.enterValue(selectors.fields.dow, data.badData.input.dow, browser)
        functions.enterValue(selectors.fields.oln, data.badData.input.oln, browser)
        functions.enterValue(selectors.fields.ols, data.badData.input.ols, browser)
        functions.enterValue(selectors.fields.oly, data.badData.input.oly, browser)
        functions.enterValue(selectors.fields.lic, data.badData.input.lic, browser)
        functions.enterValue(selectors.fields.lis, data.badData.input.lis, browser)
        functions.enterValue(selectors.fields.liy, data.badData.input.liy, browser)
        //I've set all the fields, time to submit
        browser
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