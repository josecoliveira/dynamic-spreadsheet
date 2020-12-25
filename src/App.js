import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import DynamicSpreadsheet from './components/DynamicSpreadsheet';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="\">Dynamic Spreadsheet</Navbar.Brand>
        </Navbar>
        <Container>
          <DynamicSpreadsheet />
        </Container>
      </div>
    );
  }
}

export default App;
