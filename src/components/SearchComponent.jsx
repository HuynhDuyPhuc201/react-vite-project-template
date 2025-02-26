import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import { useQuery } from '@tanstack/react-query';
import { productService } from '~/services/product.service';
import { useDebounce } from '~/hooks/useDebounce';

const SearchComponent = (props) => {
    const { placeholder, size = 'small', text } = props;
    const [search, setSearch] = useState('');

    const query = useMemo(() => {
        if (!search) return '';
        return `&q=${search}`;
    }, [search]);

    const debouncedSearch = useDebounce(search, 1000);

    const { data } = useQuery({
        queryKey: ['products', debouncedSearch],
        queryFn: async () => await productService.getAll(query),
        enabled: !!debouncedSearch, // Chỉ gọi API nếu có giá trị search
    });

    const handleOnChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    };
    return (
        <>
            <div className="flex items-center">
                <InputComponent
                    style={{ border: 'none', outline: 'none', boxShadow: 'none', borderRadius: '0', height: '40px' }}
                    placeholder={placeholder}
                    className="w-full p-3"
                    onChange={handleOnChange}
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
