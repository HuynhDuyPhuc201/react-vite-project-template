import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({ children, style, size, icon = '', onClick }) => {
    return (
        <>
            <Button size={size} icon={icon} style={style} onClick={onClick}>
                {children}
            </Button>
        </>
    );
};

export default ButtonComponent;
