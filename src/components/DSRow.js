import React from 'react';

import DSCell from './DSCell';

class DSRow extends React.Component {
  render() {
    const index = this.props.index;
    const entry = this.props.entry;
    return (
      <tr>
        <td>{index + 1}</td>
        {Object.keys(entry).map((attribute, indexVal) => (
          <DSCell
            key={indexVal}
            attribute={attribute}
            index={index}
            value={entry[attribute]}
          />
        ))}
      </tr>
    );
  }
}

export default DSRow;