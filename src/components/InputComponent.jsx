import React from 'react';
import { Input } from 'antd';

const InputComponent = ({ placeholder, style = '', ...props }) => {
    return (
        <>
            <Input placeholder={placeholder} style={style} {...props} />
        </>
    );
};

export default InputComponent;
