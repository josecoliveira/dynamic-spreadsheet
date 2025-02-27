import React from 'react';
import moment from 'moment';

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

  validate(value = this.props.value) {
    const attribute = this.props.attribute;
    if (attribute.required && value === "") {
      this.setState({invalid: true});
    } else if (attribute.type === "number" && isNaN(value)) {
      this.setState({invalid: true});
    } else if (attribute.type === "date" && value !== "" && !moment(value, "MM-DD-YYYY", true).isValid()) {

      this.setState({invalid: true});
    } else {
      this.setState({invalid: false});
    }
  }

  renderSelect() {
    const value = this.props.value;
    const attribute = this.props.attribute;
    const invalid = this.state.invalid;
    const index = this.props.index;
    const options = this.props.attribute.options;
    return (
      <select
        value={value}
        onChange={(event) => {
          this.props.changeCell(attribute.name, index, event.target.value);
          this.validate(event.target.value);
        }}
        className={invalid ? "invalid" : null}
      >
        <option></option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    );
  }

  renderInput() {
    const invalid = this.state.invalid;
    const value = this.props.value;
    const attribute = this.props.attribute;
    const index = this.props.index;
    return (
      <input
        className={invalid ? "invalid" : null}
        placeholder={attribute.type === "date" ? "MM-DD-YYYY" : null}
        value={value}
        onChange={(event) => {
          this.props.changeCell(attribute.name, index, event.target.value);
        }}
        onBlur={() => this.validate(value)}
      />
    )
  }

  render() {
    const attribute = this.props.attribute;
    return (
      <td>
        {(() => {
          if (attribute.type === "select") {
            return this.renderSelect();
          } else {
            return this.renderInput();
          }
        })()}
        
      </td>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DSCell);