/* eslint-disable no-fallthrough */
import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const contextStore = createContext({});
const { Provider } = contextStore;

function reducer(state, action) {
  const { type } = action;
  const nextState = { ...state };
  switch (type) {
    case 'url':
      nextState.url = action.payload;
      break;
    case 'editorText':
      nextState.editorText = action.payload;
      break;
      case 'dbMockUrl':
      nextState.dbMockUrl = action.payload;
      break;
    default:
      throw new Error(`Action: ${type} is unsupported`);
  }
  return { ...nextState };
}

function StateProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

StateProvider.propTypes = {
  children: PropTypes.element.isRequired,
  initialState: PropTypes.shape({}).isRequired,
};

export { contextStore, StateProvider };
