import React from 'react';
import './App.css';
import styled from '@emotion/styled'
import Editor from './components/Editor';
import MockVideoPage from './components/MockVideoPage';
import { StateProvider } from './editorContext.js';

const initialState = {
  url: '',
  dbMockUrl: '',
  editorText: '',
}

function App({className}) {

  return (
    <div className={className}>
      <StateProvider initialState={initialState}>
        <span><strong>Editor:</strong></span>
        <Editor />
        <hr />
        <span><strong>Video Landing Page:</strong></span>
        <MockVideoPage />
      </StateProvider>
    </div>
  );
}

const styledApp = styled(App)`
  span {
    display: block;
    margin-bottom: 10px;
  }

  hr {
    border: none;
    margin: 20px 0;
    border-top: 1px solid #eaeaea;
  }

  
`

export default styledApp;
