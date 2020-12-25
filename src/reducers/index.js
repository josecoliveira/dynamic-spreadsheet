import {
  CLEAR_SPREADSHEET,
  ADD_10_ROWS
} from "../constants/action-types";

const initialState = {
  fields: [
    {
      name: "Date",
      type: "date",
    }, {
      name: "Select",
      type: "enum",
      options: [
        "Option 1",
        "Option 2",
        "Option 3"
      ]
    }, {
      name: "Text",
      type: "text"
    }, {
      name: "Number",
      type: "number"
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

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_SPREADSHEET:
      return {fields: [], entries: []};
    case ADD_10_ROWS:
      const emptyEntry = {}
      state.fields.forEach((field) => {
        emptyEntry[field.name] = "";
      });
      return {
        ...state,
        entries: state.entries.concat(Array(10).fill(emptyEntry))
      };
    default:
      return state;
  }
};

export default rootReducer;