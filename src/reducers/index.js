import produce from 'immer';

import {
  ADD_10_ROWS,
  ADD_COLUMN, CHANGE_ATTRIBUTE,
  CHANGE_CELL,
  CLEAR_SPREADSHEET
} from "../constants/action-types";

const initialState = {
  attributes: [],
  entries: []
};

function add10Rows(state) {
  const emptyEntry = {}
  state.attributes.forEach((attribute) => {
    emptyEntry[attribute.name] = "";
  });
  return produce(state, (draft) => {
    draft.entries.push(...(Array(10).fill(emptyEntry)));
  });
}

function addColumn(state, attribute) {
  return produce(state, (draft) => {
    draft.attributes.push(attribute);
    draft.entries.map((entry) => {
      entry[attribute.name] = "";
      return entry;
    });
  });
}

function changeAttribute(state, oldName, newName) {
  const attributeIndex = state.attributes.findIndex((attribute) => (
    attribute.name === oldName
  ))
  return produce(state, (draft) => {
    draft.attributes[attributeIndex].name = newName;
    draft.entries.forEach((entry, index) => {
      delete entry[oldName];
      entry[newName] = state.entries[index][oldName]
    });
  });
}

function changeCell(state, index, attribute, content) {
  return produce(state, (draft) => {
    draft.entries[index][attribute] = content;
  });
}

function clearSpreadsheet() {
  return {attributes: [], entries: []};
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_10_ROWS: {
      return add10Rows(state);
    }
    case ADD_COLUMN: {
      const {attribute} = action.payload;
      return addColumn(state, attribute);
    }
    case CHANGE_ATTRIBUTE: {
      const {oldName, newName} = action.payload;
      return changeAttribute(state, oldName, newName);
    }
    case CHANGE_CELL: {
      const {index, attribute, content} = action.payload;
      return changeCell(state, index, attribute, content);
    }
    case CLEAR_SPREADSHEET: {
      return clearSpreadsheet();
    }
    default: {
      return state;
    }
  }
}

export default rootReducer;