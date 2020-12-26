import update from 'immutability-helper';

import {
  CLEAR_SPREADSHEET,
  ADD_10_ROWS,
  CHANGE_CELL
} from "../constants/action-types";

const initialState = {
  attributes: [
    {
      name: "Date",
      type: "date",
      required: false
    }, {
      name: "Select",
      type: "enum",
      required: false,
      options: [
        "",
        "Option 1",
        "Option 2",
        "Option 3"
      ]
    }, {
      name: "Text",
      type: "text",
      required: false
    }, {
      name: "Number",
      type: "number",
      required: false
    }
  ],
  entries: [
    {
      "Date": "12/23/2020",
      "Select": "Option 1",
      "Text": "Text 1",
      "Number": 1
    }, {
      "Date": "12/24/2020",
      "Select": "Option 2",
      "Text": "Text 2",
      "Number": 2
    }, {
      "Date": "12/25/2020",
      "Select": "Option 3",
      "Text": "Text 3",
      "Number": 3
    }, {
      "Date": "12/26/2020",
      "Select": "Option 4",
      "Text": "Text 4",
      "Number": 4
    }
  ]
};

function clearSpreadsheet() {
  return {attributes: [], entries: []};
}

function add10Rows(state) {
  const emptyEntry = {}
  state.attributes.forEach((attribute) => {
    emptyEntry[attribute.name] = "";
  });
  return update(state, {
    entries: {$push: Array(10).fill(emptyEntry)}
  });
}

function changeCell(state, index, attribute, content) {
  return update(state, {
    entries: {
      [index]: {
        [attribute]: {$set: content}
      }
    }
  });
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_10_ROWS:
      return add10Rows(state);
    case CHANGE_CELL:
      const {index, attribute, content} = action.payload;
      return changeCell(state, index, attribute, content);
    case CLEAR_SPREADSHEET:
      return clearSpreadsheet();
    default:
      return state;
  }
}

export default rootReducer;