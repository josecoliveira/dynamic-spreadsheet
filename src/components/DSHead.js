import React from 'react';

class DSHead extends React.Component {
  render() {
    const attributes = this.props.attributes;
    return (
      <thead>
        <tr>
          <th></th>
          {attributes.map((attribute, index) => (
            <th key={index}>{attribute.name}</th>
          ))}
        </tr>
      </thead>
    )
  }
}

export default DSHead;