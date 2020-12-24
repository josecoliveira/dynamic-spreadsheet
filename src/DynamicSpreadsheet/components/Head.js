import React from 'react';

class Head extends React.Component {
  render() {
    const fields = this.props.fields;
    return (
      <thead>
        <tr>
          <th></th>
          {fields.map((field, index) => (
            <th key={index}>{field.name}</th>
          ))}
        </tr>
      </thead>
    )
  }
}

export default Head;