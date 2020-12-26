import update from 'immutability-helper';

import {
  ADD_10_ROWS,
  ADD_COLUMN,
  CHANGE_CELL,
  CLEAR_SPREADSHEET
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

function add10Rows(state) {
  const emptyEntry = {}
  state.attributes.forEach((attribute) => {
    emptyEntry[attribute.name] = "";
  });
  return update(state, {
    entries: {$push: Array(10).fill(emptyEntry)}
  });
}

function addColumn(state, name, type, required, options) {
  const attribute = {
    name,
    type,
    required
  }
  if (type === "select") {
    attribute.options = options;
  }
  console.log("Update")
  return update(state, {
    attributes: {$push: [attribute]},
    entries: {
      $apply: (entries) => {
        return entries.map((entry) => update(entry, {
          [name]: {$set: ""}
        }))
      }
    }
  })
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

function clearSpreadsheet() {
  return {attributes: [], entries: []};
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_10_ROWS:
      return add10Rows(state);
    case ADD_COLUMN:
      const {name, type, required, options} = action.payload;
      return addColumn(state, name, type, required, options);
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