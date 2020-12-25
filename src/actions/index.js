import {
  CLEAR_SPREADSHEET,
  ADD_10_ROWS
} from "../constants/action-types";

export function clearSpreadsheet() {
  return {type: CLEAR_SPREADSHEET}
};

export function add10Rows() {
  return {type: ADD_10_ROWS}
};