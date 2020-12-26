import React from 'react';

import { connect } from "react-redux";
import { changeCell } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    changeCell: (attribute, index, value) =>
      dispatch(changeCell(attribute, index, value))
  };
}

class DSCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: false
    }
    this.validate = this.validate.bind(this);
  }

  validate() {
    const value = this.props.value;
    const attribute = this.props.attribute;
    if (value === "" && attribute.required) {
      this.setState({invalid: true});
    } else {
      this.setState({invalid: false});
    }
  }

  render() {
    const attribute = this.props.attribute
    const index = this.props.index;
    const value = this.props.value;
    const invalid = this.state.invalid;
    return (
      <td>
        <input
          className={invalid ? "invalid" : null}
          value={value}
          onChange={(event) => {
            this.props.changeCell(attribute.name, index, event.target.value);
          }}
          onBlur={this.validate}
        />
      </td>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DSCell);