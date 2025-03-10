import {
  ADD_10_ROWS,
  ADD_COLUMN,
  CHANGE_ATTRIBUTE,
  CHANGE_CELL,
  CLEAR_SPREADSHEET
} from "../constants/action-types";

export function add10Rows() {
  return {type: ADD_10_ROWS}
}

export function addColumn(attribute) {
  return {
    type: ADD_COLUMN,
    payload: {
      attribute
    }
  }
}

export function changeAttribute(oldName, newName) {
  return {
    type: CHANGE_ATTRIBUTE,
    payload: {
      oldName,
      newName
    }
  }
}

export function changeCell(attribute, index, content) {
  return {
    type: CHANGE_CELL,
    payload: {
      index,
      attribute,
      content
    }
  }
}

export function clearSpreadsheet() {
  return {type: CLEAR_SPREADSHEET}
};
