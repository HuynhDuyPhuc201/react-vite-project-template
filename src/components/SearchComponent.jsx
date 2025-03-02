import React, { useEffect, useMemo, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import { useQuery } from '@tanstack/react-query';
import { productService } from '~/services/product.service';
import { useDebounce } from '~/hooks/useDebounce';
import { useAppStore } from '~/store/useAppStore';

const SearchComponent = ({ placeholder, size = 'small', text }) => {
    const { setSearchResults, searchValue, setSearchValue, setOverlayVisible } = useAppStore();

    const debouncedSearch = useDebounce(searchValue, 1000);

    const { data } = useQuery({
        queryKey: ['products', debouncedSearch],
        queryFn: async () => await productService.getAll(`?q=${debouncedSearch}`),
        enabled: !!debouncedSearch,
    });

    useEffect(() => {
        if (data) {
            setSearchResults(data.data);
        }
    }, [data]); // ✅ Đúng: chỉ chạy khi data thay đổi

    const handleOnChange = (e) => {
        setSearchValue(e.target.value);
        if (searchValue) {
            setSearchResults([]);
        }
    };

    return (
        <div className="flex items-center">
            <InputComponent
                style={{ border: 'none', outline: 'none', boxShadow: 'none', borderRadius: '0', height: '40px' }}
                placeholder={placeholder}
                className="w-full p-3"
                onChange={handleOnChange}
                onFocus={() => setOverlayVisible(true)} // Khi focus input -> Hiển thị overlay
            />
            <ButtonComponent
                size={size}
                icon={<SearchOutlined />}
                style={{ fontSize: '14px', borderRadius: '0', border: 'none' }}
            >
                {text}
            </ButtonComponent>
        </div>
    );
};

export default SearchComponent;
