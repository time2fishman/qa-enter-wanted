module.exports = {
    //the 'key' for the fields should match the key of the fields' values in your test_data
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