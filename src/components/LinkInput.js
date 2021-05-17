import React from 'react';

const LinkInput = ({onChange, value, name}) => {
    const handleChange = event => {
        const text = event.target.value;
        onChange(name, text);
      };
    return (
      <div className="link-input-container">
          <input
            onChange={handleChange}
            value={value}
            name={name}
            type='text'
            placeholder='Add URL here'
          />
      </div>
    );
}

export default LinkInput;
  