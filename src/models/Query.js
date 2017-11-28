export default class Query {
  constructor() {
    //defines the list of fields in the form
    this.fields = {
      hdr: '',
      mke: '',
      ori: '',
      nam: '',
      sex: '',
      rac: '',
      hgt: '',
      wgt: '',
      hai: '',
      off: '',
      dow: '',
      oln: '',
      ols: '',
      oly: '',
      lic: '',
      lis: '',
      liy: ''
    }

    //all the mandatory fields per the requirements
    this.mandatoryFields = [
      'hdr',
      'mke',
      'ori',
      'nam',
      'sex',
      'rac',
      'hgt',
      'wgt',
      'hai',
      'off',
      'dow'
    ]

    //optional fields per the requirements, where if one is submitted, all must be filled
    this.optionalFieldGroups = [
      {
        error: 'If Operator\'s License Number, DL State, or DL Expiration Year are present, all three must be present.\n',
        list: [
          'oln',
          'oly',
          'ols'
        ]
      },
      {
        error: 'If License Plate, License State, or License Year are present, all three must be present.\n',
        list: [
          'lis',
          'liy',
          'lic'
        ]
      }
    ]

    this.valid = true             //query is valid until proven defective
    this.assembledQuery = ''      //assembled query is built when the fields are validated

    this.validateFields = this.validateFields.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  updateField(code, val) {
    this.fields[code] = val;
  }

  validateFields(fields) {
    this.valid = true
    this.assembledQuery = ''
    let errorMessages = []
    fields.map(field => {
      if (this.mandatoryFields.includes(field.code) && this.fields[field.code] === '') {
        this.valid = false
        errorMessages.push('The field named "' + field.name + '" must be included.\n')
      }
      if (this[field.code] === '')
        return false
      let results = field.validate(this.fields[field.code])
      if (!results.valid) {
        this.valid = false
        let tempMessages = errorMessages
        errorMessages = tempMessages.concat(results.errorMessages)
      }
      return true
    })
    this.optionalFieldGroups.map(group => {
      let fieldsEntered = 0
      for (let i = 0; i < group.list.length; i++) {
        if (this.fields[group.list[i]] !== '')
          fieldsEntered++ //adds 1 for every field in the group that has been populated
      }
      if (fieldsEntered < group.list.length && fieldsEntered > 0){
        errorMessages.push(group.error) //if there is at least one, but not an entry for each field, will return error message
        this.valid = false
      }
      return true
    })
    if (this.valid) {
      Object.entries(this.fields).forEach(([key, value]) => {
        if(key==='wgt'){
          while (value.length<3) {
            value = '0' + value; //will increase length with preceding zeroes until the value is 3 characters long
          }
        }
        this.assembledQuery += value + '.'
      })
      this.assembledQuery = this.assembledQuery.slice(0, -1)
      console.log(this.assembledQuery)
      console.log()
      let fieldCount = Object.keys(this.fields).length
      let extraPeriods = this.assembledQuery.split(".").length - fieldCount
      if(extraPeriods === 0){
        console.log('There are no extra periods (".") in the assembled text.')
      }
      else{
        console.log('There are ' + extraPeriods  + ' extra periods (".") in the assembled text.')
      }
    }
    return ({ valid: this.valid, errorMessages: errorMessages, assembledQuery: this.assembledQuery })
  }
}