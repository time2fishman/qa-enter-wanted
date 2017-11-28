const dataTypes = {
    date: {
        regex: new RegExp('^(0[0-9]|1[0-2])(0[1-9]|[1-3][0-9])(19|20)([0-9][0-9])$'),
        error: 'must be entered as a date, MMDDYYYY, no earlier than 01011900 and no later than today\'s date.\n'
    },
    year: {
        regex: new RegExp('^(19|20)([0-9][0-9])'),
        error: 'must be entered as a 4 digit year, YYYY, no earlier than 1900 and no later than this year.\n'
    },
    sex: {
        regex: new RegExp('^(M|F|U|m|f|u)$'),
        error: 'must be entered in as a single character, M for male, F for female, U for unknown.\n'
    },
    alpha: {
        regex: new RegExp('^[a-zA-Z]+$'),
        error: 'can only include characters from the English Alphabet.\n'
    },
    numeric: {
        regex: new RegExp('^[0-9]+$'),
        error: 'can only include numeric characters.\n'
    },
    alphanumeric: {
        regex: new RegExp('^[a-zA-Z0-9]+$'),
        error: 'can only include characters from the English Alphabet or numeric characters.\n'
    },
    alphaspecial: {
        regex: new RegExp('^([^0-9]*)+$'),
        error: 'can only include characters from the English Alphabet or special characters.\n'
    },
    numericspecial: {
        regex: new RegExp('^([^a-zA-Z]*)+$'),
        error: 'can only include numeric or special characters.\n'
    },
    state: {
        regex: new RegExp('^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|WA|VA|WV|WI|WY|GU|PR|VI)$'),
        error: 'can only include a valid State/Territory abbreviation.\n'
    }
}

export default class Field {
    constructor(name, code, alpha, numeric, special, custom, min, max) {
        this.name = name //name of the field
        this.code = code //code of the field (per NCIC)
        this.alpha = alpha //whether the field allows alphabet characters
        this.numeric = numeric //whether the field allows numbers
        this.special = special //whether the field allows special characters
        this.custom = custom //the "custom" field type from the DataTypes list above, or null if no custom value
        this.min = min //the minimum number of characters allowable
        this.max = max //the maximum number of characters allowable
    }

    validate(value) {
        let regex = ''
        let errorMessages = []
        let valid = true

        if ((value.length < this.min || value.length > this.max) && value !== '') {
            valid = false
            if (this.min === this.max)
                errorMessages.push('The "' + this.name + '" field should be ' + this.min + ' character' + (this.min === 1 ? '' : 's') + ' long.')
            else
                errorMessages.push('The "' + this.name + '" field should be between ' + this.min + ' and ' + this.max + ' characters long.')
        }

        if (valid && value !== '') { //only checks field content if the right number of characters is entered.
            let errorStart = 'The "' + this.name + '" field '
            switch (this.custom) {
                case 'date':
                    regex = dataTypes.date.regex
                    errorMessages.push(errorStart + dataTypes.date.error)
                    break;
                case 'year':
                    regex = dataTypes.year.regex
                    errorMessages.push(errorStart + dataTypes.year.error)
                    break;
                case 'sex':
                    regex = dataTypes.sex.regex
                    errorMessages.push(errorStart + dataTypes.sex.error)
                    break;
                case 'state':
                    regex = dataTypes.state.regex
                    errorMessages.push(errorStart + dataTypes.state.error)
                    break;
                default:
                    if (this.alpha && !this.numeric && !this.special) {
                        regex = dataTypes.alpha.regex
                        errorMessages.push(errorStart + dataTypes.alpha.error)
                    }
                    else if (!this.alpha && this.numeric && !this.special) {
                        regex = dataTypes.numeric.regex
                        errorMessages.push(errorStart + dataTypes.numeric.error)
                    }
                    else if (this.alpha && !this.numeric && this.special) {
                        regex = dataTypes.alphaspecial.regex
                        errorMessages.push(errorStart + dataTypes.alphaspecial.error)
                    }
                    else if (this.alpha && this.numeric && !this.special) {
                        regex = dataTypes.alphanumeric.regex
                        errorMessages.push(errorStart + dataTypes.alphanumeric.error)
                    }
                    else if (!this.alpha && this.numeric && this.special) {
                        regex = dataTypes.numericspecial.regex
                        errorMessages.push(errorStart + dataTypes.numericspecial.error)
                    }
                    break;
                // if (!valid)
                // throw 'Invalid value in ' + this.name //throws error if invalid value entered
            }

            //this section will only trigger if a regex has been defined for the field, which should be any field that has any content validation at all (not allowing any types of characters whatsoever), and regex will only be set if it passed field length requirements already, so this will only trigger while the field has passed everything so far...
            if (regex !== '') {
                valid = regex.test(value) //valid will be set to true if the content matches the set regex

                //further date checking to make sure the date is no later than tomorrow
                if (this.custom === 'date' && valid) {
                    let date = new Date()
                    let today = ''
                    today += date.getFullYear() //formatting date YYYYMMDD allows for direct >< comparison for earlier/later dates
                    let month = date.getMonth() + 1
                    today += month < 10 ? '0' + month : month //adds leading 0 for months before october (10)
                    let day = date.getDate() + 1 //to account for differences in time zones, will allow one day past current date
                    today += day < 10 ? '0' + day : day //adds leading 0 for days before the 10th of the month
                    let dateToCompare = value.slice(4, 8) + value.slice(0, 2) + value.slice(2, 4) //changes entered date to YYYYMMDD for direct comparison
                    valid = parseInt(dateToCompare, 10) < parseInt(today, 10) ? true : false //returns true if date entered is less than today
                }
                //further checking to make sure the year is no later than this year
                else if (this.custom === 'year' && valid) {
                    let date = new Date()
                    valid = parseInt(value, 10) <= date.getFullYear() ? true : false //returns true if the year is less than or equal to this year
                }
            }
            //if the field checks out as valid, makes sure to pass an empty list of error messages
            if (valid)
                errorMessages = []
        }

        return { valid: valid, errorMessages: errorMessages }
    }
}