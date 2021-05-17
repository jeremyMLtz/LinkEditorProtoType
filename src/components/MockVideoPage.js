import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { contextStore } from '../editorContext';

const MockVideoPage = ({className}) => {
    const { state } = useContext(contextStore);
    const { dbMockUrl } = state;
    // this converts the db value into html
    // this replace chain could also be broken out into
    // a better regex function
    const convertDbValue = () => {
        const convertedValue = dbMockUrl.replace(/{{bblink/g, '<a').replace(/{{\/bblink}}/g, '</a>').replace(/"}}/g, '">');
        return convertedValue;
    }
    const html = convertDbValue();
    return (
      <div className={className}>
          {/* using dangerouslySetInnerHTML will work for the video landing page
          as that is built in react but we may need another option for other pages
          like parsing the html string into usable data */}
          <div dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    );
}

const styledMockVideoPage = styled(MockVideoPage)`

`

export default styledMockVideoPage;
  