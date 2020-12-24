import React from 'react';

import Table from 'react-bootstrap/Table';

import Head from './components/Head';
import Row from './components/Row';

class DynamicSpreadsheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        {
          name: "Date",
          type: "date",
        }, {
          name: "Select",
          type: "enum",
          options: ["Option 1", "Option 2", "Option 3"]
        }, {
          name: "Text",
          type: "text"
        }, {
          name: "Number",
          type: "number"
        }
      ],
      entries: [
        {
          "Date": "12/23/2020",
          "Select": "Option 1",
          "Text": "Text 1",
          "Number": 1
        }, {
          "Date": "12/24/2020",
          "Select": "Option 2",
          "Text": "Text 2",
          "Number": 2
        }, {
          "Date": "12/25/2020",
          "Select": "Option 3",
          "Text": "Text 3",
          "Number": 3
        }, {
          "Date": "12/26/2020",
          "Select": "Option 4",
          "Text": "Text 4",
          "Number": 4
        }
      ]
    };
    this.handleOnChange.bind(this);
  }

  render() {
    const fields = this.state.fields;
    const entries = this.state.entries;
    return (
      <div>
        <Table responsive size={"sm"}>
          <Head fields={fields} />
          <tbody>
            {entries.map((entry, index) => (
              <Row
                key={index}
                index={index}
                entry={entry}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default DynamicSpreadsheet;