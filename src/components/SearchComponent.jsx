import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';

const SearchComponent = (props) => {
    const { placeholder, size = 'small', text } = props;
    return (
        <>
            <div className="flex items-center">
                <InputComponent
                    style={{ border: 'none', outline: 'none', boxShadow: 'none', borderRadius: '0', height: '40px' }}
                    placeholder={placeholder}
                />
                <ButtonComponent
                    size={size}
                    icon={<SearchOutlined />}
                    style={{ fontSize: '14px', borderRadius: '0', border: 'none' }}
                >
                    {text}
                </ButtonComponent>
            </div>
        </>
    );
};

export default SearchComponent;
