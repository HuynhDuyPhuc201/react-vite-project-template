import React from 'react';

const InputComponent = ({ placeholder, style = '', ...props }) => {
    return (
        <>
            <input placeholder={placeholder} style={style} {...props} />
        </>
    );
};

export default InputComponent;
