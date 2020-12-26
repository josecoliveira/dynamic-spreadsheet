import React from 'react';

import { connect } from "react-redux";
import {
  changeCell,
} from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    changeCell: (attribute, index, value) =>
      dispatch(changeCell(attribute, index, value))
  };
}

class DSCell extends React.Component {
  render() {
    const attribute = this.props.attribute
    const index = this.props.index;
    const value = this.props.value;
    return (
      <td key={index}>
        <input
          value={value}
          onChange={(event) => {
            event.preventDefault();
            this.props.changeCell(attribute, index, event.target.value);
          }}
        />
      </td>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DSCell);