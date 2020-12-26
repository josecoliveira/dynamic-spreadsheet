import React from 'react';
import { connect } from "react-redux";
import { changeAttribute } from "../actions";

function mapDispatchToProps(dispatch) {
  return {
    changeAttribute: (oldName, newName) => dispatch(changeAttribute(oldName, newName))
  };
}

class DSHead extends React.Component {
  render() {
    const attributes = this.props.attributes;
    const changeAttribute = this.props.changeAttribute;
    return (
      <thead>
        <tr>
          <th></th>
          {attributes.map((attribute, index) => (
            <th key={index}>
              <input
                value={attribute.name}
                onChange={(event) => {
                  changeAttribute(attribute.name, event.target.value);
                }}
              />
            </th>
          ))}
        </tr>
      </thead>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DSHead);