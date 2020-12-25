import React from 'react';

import Cell from './Cell';

class Row extends React.Component {
  render() {
    const index = this.props.index;
    const entry = this.props.entry;
    return (
      <tr>
        <td>{index + 1}</td>
        {Object.values(entry).map((value, indexVal) => (
          <Cell key={indexVal} index={indexVal} value={value} />
        ))}
      </tr>
    );
  }
}

export default Row;