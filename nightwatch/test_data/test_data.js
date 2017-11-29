module.exports = {
    goodData: {
        input: {
            hdr: '975425478',
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
            assembledQuery: '975425478.MKE.CHI1234SI.Harry Dresden.M.W.607.200.Brown.Arson.05022016......'
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
