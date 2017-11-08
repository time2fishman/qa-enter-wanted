import React, {Component} from 'react'

import Query from './models/Query'
import Field from './models/Field'

import QueryEditor from './components/QueryEditor'
import Header from './components/Header'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: new Query(),
      fields: [
        //defines the list of fields in the query
        new Field('Header', 'hdr', true, true, false, null, 9, 19), //should accept all characters
        new Field('MKE', 'mke', true, false, true, null, 2, 4),
        new Field('Originating Agency Identifier', 'ori', true, true, false, null, 9, 9),
        new Field('Name', 'nam', true, true, true, null, 3, 30),
        new Field('Sex', 'sex', true, false, false, null, 1, 1), //should validate as a 'sex' data type
        new Field('Race', 'rac', true, false, false, null, 1, 1),
        new Field('Height', 'hgt', false, true, false, null, 3, 3),
        new Field('Weight', 'wgt', false, true, false, null, 3, 3),
        new Field('Hair', 'hai', true, false, false, null, 3, 10),
        new Field('Offense', 'off', true, true, true, null, 5, 13), //should allow 15 characters
        new Field('Date of Warrant/Violation', 'dow', false, true, false, 'date', 8, 8),
        new Field('Drivers License', 'oln', true, true, true, null, 1, 20),
        new Field('DL State', 'ols', true, false, false, 'state', 2, 2),
        new Field('DL Expiration Year', 'oly', false, true, false, 'year', 4, 4), //should allow future dates
        new Field('License Plate', 'lic', true, true, false, null, 5, 8),
        new Field('License State', 'lis', true, false, false, 'state', 2, 2),
        new Field('License Year', 'liy', false, true, false, 'year', 4, 4)
      ]
    }

    this.refresh = this
      .refresh
      .bind(this)
  }

  refresh() {
    this.setState(this.state)
  }

  render() {
    return (
      <div id="app">
        <Header/>
        <div className="main-container">
          <QueryEditor query={this.state.query} fields={this.state.fields}/>
        </div>
      </div>
    )
  }
}

export default App;
