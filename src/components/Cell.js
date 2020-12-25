import React from 'react';

class Cell extends React.Component {
  render() {
    const index = this.props.index;
    const value = this.props.value;
    return (
      <td key={index}>
        <input
          value={value}
        />
      </td>
    );
  }
}

export default Cell;