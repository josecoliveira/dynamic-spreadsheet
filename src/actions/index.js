import {
  ADD_10_ROWS,
  CHANGE_CELL,
  CLEAR_SPREADSHEET
} from "../constants/action-types";

export function add10Rows() {
  return {type: ADD_10_ROWS}
};

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
