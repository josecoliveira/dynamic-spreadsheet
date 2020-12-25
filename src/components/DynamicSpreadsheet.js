import React from 'react';

import { connect } from "react-redux";
import {
  add10Rows,
  clearSpreadsheet
} from "../actions/index";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Head from './Head';
import Row from './Row';

function mapStateToProps(state) {
  return {
    fields: state.fields,
    entries: state.entries
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add10Rows: () => dispatch(add10Rows()),
    clearSpreadsheet: () => dispatch(clearSpreadsheet()),
  };
}

class DynamicSpreadsheet extends React.Component {
  render() {
    const fields = this.props.fields;
    const entries = this.props.entries;
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
        <Button onClick={this.props.add10Rows}>Add 10 rows</Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicSpreadsheet);