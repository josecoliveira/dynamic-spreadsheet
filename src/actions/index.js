import {
  ADD_10_ROWS,
  ADD_COLUMN,
  CHANGE_CELL,
  CLEAR_SPREADSHEET
} from "../constants/action-types";

export function add10Rows() {
  return {type: ADD_10_ROWS}
}

export function addColumn(name, type, required, options) {
  return {
    type: ADD_COLUMN,
    payload: {
      name,
      type,
      required,
      options
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
