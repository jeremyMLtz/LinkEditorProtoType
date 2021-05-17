import React, {useContext, useEffect, useState} from 'react';
import { contextStore } from '../editorContext';
import styled from '@emotion/styled';
import LinkInput from './LinkInput';

const Editor = ({className}) => {
    const [ showState, setShowState ] = useState(false);
    const { state, dispatch } = useContext(contextStore);
    const { url, editorText, dbMockUrl } = state;

    // This function handles creating and inserting the hyper link, it could be cleaned up
    const handleCreateLink = () => {
        const selectedText = window.getSelection();
        if (selectedText.rangeCount) {
            // here with range we get the selected text at the beginning of its position
            const range = selectedText.getRangeAt(0);
            const text = selectedText.toString();
            const element = document.createElement('a');
            element.href = url;
            element.target = '_blank';
            element.rel = 'noopener noreferrer';
            const elementContent = document.createTextNode(text);
            element.appendChild(elementContent)
            range.deleteContents();
            range.insertNode(element);
        }
    }

    // const handleCreateBold = () => {
    //     const selectedText = window.getSelection();
    //     if (selectedText.rangeCount) {
    //         const range = selectedText.getRangeAt(0);
    //         const text = selectedText.toString();
    //         const element = document.createElement('strong');
    //         const elementContent = document.createTextNode(text);
    //         element.appendChild(elementContent)
    //         range.deleteContents();
    //         range.insertNode(element);
    //     }
    // }

    // This function updates the value of the html in the Editor
    // into a DB safe value. Currently it is just a replace chain but we could
    // build out a fancy regex function to handle this better
    const handleFilterLinkforDB = () => {
        const dbValue = editorText.replace(/<a/g, '{{bblink').replace(/">/g, '"}}').replace(/<\/a>/g, '{{/bblink}}');
        dispatch({
            type: 'dbMockUrl',
            payload: dbValue
        });
        setShowState(true);
    }

    // const handleFilterBoldforDB = () => {
    //     const dbValue = editorText.replace(/<strong/g, '{{bbbold').replace(/">/g, '"}}').replace(/<\/strong>/g, '{{/bbbold}}');
    //     dispatch({
    //         type: 'dbMockUrl',
    //         payload: dbValue
    //     });
    //     setShowState(true);
    // }

    // const handleFilterForDB = () => {
    //     handleFilterBoldforDB();
    //     handleFilterLinkforDB();
    // }

    useEffect(() => {
        // here we add an input event onto the editor div
        // so we can listen for changes in its inner html
        const editor = document.getElementById('editor');
        editor.addEventListener('input', (e) => {
            dispatch({
                type: 'editorText',
                payload: e.target.innerHTML
            })
        })
      }, []);
    return (
        <div className={className}>
            <div style={{marginRight: '25px'}}>
                <div
                    contentEditable
                    className="editor"
                    name="editor"
                    id='editor'
                >
                </div>
                <br />
                <LinkInput
                    name='url'
                    onChange={(name, text) => {
                        dispatch({
                            type: 'url',
                            payload: text
                        });
                    }}
                    value={url}
                />
                <br />
                <button
                    onClick={handleCreateLink}
                >
                    Link
                </button>
                {/* <button
                    onClick={handleCreateBold}
                >
                    Bold
                </button> */}
                <button className='save' onClick={handleFilterLinkforDB}>Fake Save</button>
            </div>
            <div>
                <span><strong>State Values:</strong></span>
                {showState && (
                <div>
                    <p>Editor Value: {editorText}</p>
                    <p>Database Value: {dbMockUrl}</p>
                </div>
            )}
            </div>
        </div>

    );
}

const styledEditor = styled(Editor)`
display: flex;
button {
    background: #0099CC;
    border: none;
    color: #ffffff;
    border-radius: 3px;
    padding: 3px 20px;
    margin-right: 10px;
    
}

.editor {
    width: 230px;
    height: 115px;
    border: solid #f0f0f0;
    overflow-y: scroll;
}
.save {
    margin-top: 15px;
    display: block;
    color: #0099CC;
    border: 1px solid #0099cc;
    background: transparent;
    border-radius: 3px;
    padding: 3px 20px;
  }
  p {
      font-size: 12px;
  }
`

export default styledEditor;
  