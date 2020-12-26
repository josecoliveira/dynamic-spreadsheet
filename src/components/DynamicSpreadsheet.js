import React from 'react';
import produce from "immer";

import { connect } from "react-redux";
import {
  add10Rows, addColumn,
  clearSpreadsheet
} from "../actions/index";

import {
  Alert,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Modal,
  Row,
  Table
} from "react-bootstrap";

import {
  FaColumns,
  FaEraser,
  FaPlus,
  FaTimes
} from 'react-icons/fa';

import DSHead from './DSHead';
import DSRow from './DSRow';


function mapStateToProps(state) {
  return {
    attributes: state.attributes,
    entries: state.entries
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add10Rows: () => dispatch(add10Rows()),
    addColumn: (attribute) => dispatch(addColumn(attribute)),
    clearSpreadsheet: () => dispatch(clearSpreadsheet()),
  };
}

class DynamicSpreadsheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddColumnModal: false,
      addColumnName: "",
      addColumnType: "text",
      addColumnRequired: false,
      addColumnOptions: [],
      newOptionName: "",
      showAddColumnWarning: false
    }
    this.handleCancelAddColumn = this.handleCancelAddColumn.bind(this);
    this.handleSaveAddColumn = this.handleSaveAddColumn.bind(this);
    this.handleAddNewOption = this.handleAddNewOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  handleCancelAddColumn() {
    this.setState({
      showAddColumnModal: false,
      addColumnName: "",
      addColumnType: "",
      addColumnRequired: false,
      addColumnOptions: [],
      showAddColumnWarning: false
    });
  }

  handleSaveAddColumn() {
    const {
      addColumnName,
      addColumnType,
      addColumnRequired,
      addColumnOptions
    } = this.state;
    if (addColumnName === "" || addColumnType === "" || (addColumnType === "select" && addColumnOptions.length === 0)) {
      this.setState({showAddColumnWarning: true});
    } else {
      const attribute = {
        name: addColumnName,
        type: addColumnType,
        required: addColumnRequired
      };
      if (addColumnType === "select") {
        attribute.options = addColumnOptions;
      }
      this.props.addColumn(attribute);
      this.setState({
        showAddColumnModal: false,
        addColumnName: "",
        addColumnType: "",
        addColumnRequired: false,
        addColumnOptions: [],
        showAddColumnWarning: false
      });
    }
  }

  handleAddNewOption() {
    this.setState((state) => (
      produce(state, (draft) => {
       draft.addColumnOptions.push(state.newOptionName);
       draft.newOptionName = "";
      })
    ));
  }

  handleDeleteOption(index) {
    this.setState((state) => (
      produce(state, (draft) => {
        draft.addColumnOptions.splice(index, 1);
      })
    ));
  }

  renderButtonToolbar() {
    return (
      <ButtonToolbar>
        <ButtonGroup className="mr-2">
          <Button
            className="button"
            onClick={() => this.setState({showAddColumnModal: true})}
          >
            <FaColumns className="icon"/>
            Add column
          </Button>
          {(() => {
            if (this.props.attributes.length !== 0) {
              return (
                <Button className="button" onClick={this.props.add10Rows}>
                  <FaPlus className="icon"/>
                  Add 10 rows
                </Button>
              )
            }
          })()}
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button className="button" variant="danger" onClick={this.props.clearSpreadsheet}>
            <FaEraser className="icon"/>
            Clear everything
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

  renderTable() {
    const {attributes, entries} = this.props;
    return (
      <Table className="table" responsive size="sm">
        <DSHead attributes={attributes}/>
        <tbody>
        {entries.map((entry, index) => (
          <DSRow
            key={index}
            index={index}
          />
        ))}
        </tbody>
      </Table>
    );
  }

  renderListOfOptions() {
    const {addColumnOptions, newOptionName} = this.state;
    return (
      <>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Options
          </Form.Label>
          <Col sm={10}>
            <ListGroup className="list-of-options">
              {addColumnOptions.map((option, index) => (
                <ListGroup.Item className="item" key={index}>
                  <span className="option-name">{option}</span>
                  <Button
                    variant="danger"
                    className="delete-button"
                    onClick={() => this.handleDeleteOption(index)}
                  >
                    <FaTimes className="icon"/>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{offset: 2, span: 10}} style={{"display": "flex"}}>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Type the new option here"
                value={newOptionName}
                onChange={(event) =>
                  this.setState({newOptionName: event.target.value})
                }
              />
              <InputGroup.Append>
                <Button
                  className="button"
                  onClick={this.handleAddNewOption}
                >
                  <FaPlus className="icon"/>
                  Add option
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Group>
      </>
    );
  }

  renderAddColumnModal() {
    const {
      showAddColumnModal,
      addColumnName,
      addColumnRequired,
      addColumnType,
      showAddColumnWarning
    } = this.state;
    return (
      <Modal show={showAddColumnModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Add Column</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {(() => {
              if (showAddColumnWarning) {
                return <Alert variant="danger">All fields must be filled.</Alert>
              }
            })()}
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={addColumnName}
                  onChange={(event) =>
                    this.setState({addColumnName: event.target.value})
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Col sm={{offset: 2, span: 10}}>
                <Form.Check
                  type="checkbox"
                  value={addColumnRequired}
                  onChange={(event) =>
                    this.setState({addColumnRequired: event.target.value})
                  }
                  label="Required"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Type
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={addColumnType}
                  onChange={(event) => {
                    this.setState({addColumnType: event.target.value})
                  }}
                >
                  <option></option>
                  <option value="date">Date</option>
                  <option value="select">List of Options</option>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                </Form.Control>
              </Col>
            </Form.Group>
            {(() => {
              if (this.state.addColumnType === "select") {
                return this.renderListOfOptions();
              }
            })()}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={this.handleCancelAddColumn}
            >
              Cancel
            </Button>{' '}
            <Button
              variant="primary"
              onClick={this.handleSaveAddColumn}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }

  render() {
    return (
      <>
        {this.renderButtonToolbar()}
        {this.renderTable()}
        {this.renderAddColumnModal()}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicSpreadsheet);