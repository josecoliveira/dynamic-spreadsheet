import React from 'react';

import DSCell from './DSCell';
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    attributes: state.attributes,
    entries: state.entries
  }
}

class DSRow extends React.Component {
  render() {
    const index = this.props.index;
    const attributes = this.props.attributes;
    const entry = this.props.entries[index];
    return (
      <tr>
        <td>{index + 1}</td>
        {attributes.map((attribute) => (
          <DSCell
            key={attribute.name}
            attribute={attribute.name}
            index={index}
            value={entry[attribute.name]}
          />
        ))}
      </tr>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(DSRow);