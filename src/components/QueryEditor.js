import React, { Component } from 'react';
import * as source from './values.js';

class QueryEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: Object.assign({},props.query),
      notModified: true,
      validated: false,
      valid: true,
      errorMessages: [],
      assembledQuery: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.clear = this.clear.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({ notModified: true })
  }

  handleChange(prop, val) {
    if (this.state.notModified) {
      this.setState({ notModified: false, validated: false })
    }
    let queryCopy = Object.assign({}, this.state.query)
    queryCopy.fields[prop] = val
    queryCopy.updateField(prop, val)
    this.setState({ query: queryCopy })
  }

  submit() {
    let results = this.state.query.validateFields(this.props.fields)
    this.setState({ notModified: true, validated: true, valid: results.valid, errorMessages: results.errorMessages, assembledQuery: results.assembledQuery })
  }

  clear() {
    let queryCopy = Object.assign({}, this.state.query)
    for(let prop in queryCopy.fields){
      if(queryCopy.fields.hasOwnProperty(prop))
        queryCopy.fields[prop] = ''
    }
    this.setState({ notModified: true, validated: false, valid: true, errorMessages: [], assembledQuery: source.default, query: queryCopy})
  }

  render() {
    let inputs = this.props.fields.map(field => {
      return <div>
        <span className="fieldHeader" name={field.code + 'Header'}> {field.name} </span><br />
        <input className="inputField" name={field.code + 'Input'} value={this.state.query.fields[field.code]||''} onChange={(e) => { this.handleChange(field.code, e.target.value) }}></input>
      </div>
    })
    let errors = this.state.valid ? '' : this.state.errorMessages.map(error => {
      return error !== '' ? <li className="errorMessage">{error}</li> : ''
    })
    return (
      <div>
        {
          this.state.query
            ?
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      {inputs}
                    </td>

                    <td>
                      <p id="validHeader" alt="is"> {this.state.validated ? (this.state.valid ? 'Valid' : 'Errors Received:') : (errors===''?'': 'Errors Received:')} </p>
                      <list id="errorList">{errors}</list>
                      <br />
                      <button id="saveBtn" className="button" value="The" disabled={this.state.notModified} onClick={this.submit}> Submit </button>
                      <button id="clearBtn" className="button" onClick={this.clear}> Clear </button>
                      <br />
                      <span name="queryTitle"> {this.state.validated ? (this.state.valid ? 'Assembled Query:' : 'No results generated due to error.') : 'Submit query for validation.'} </span>
                      <span name="queryBody"> {(this.state.validated && this.state.valid) ? this.state.assembledQuery : ''} </span>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            :
            <p id="noQuery"> Error Loading Query </p>
        }
        <a id="versionNumber"> Version 1.8 </a>

      </div>
    )
  }
}

export default QueryEditor;

