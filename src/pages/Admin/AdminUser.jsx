import React, { useState } from 'react';
import { PlusOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space, Tag } from 'antd';
import { Divider, Radio, Table } from 'antd';
import { Modal } from 'antd';

const AdminUser = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sydney No. 1 Lake Park',
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    const [selectionType, setSelectionType] = useState('checkbox');

    return (
        <>
            <div className="wrap ml-10 mt-10 w-[80%]">
                <h1> Quản lí người dùng</h1>
                <Button
                    className="p-20 border plus-border flex items-center justify-center w-[100px] h-[100px] mt-5 cursor-pointer"
                    style={{ border: '1px solid', padding: '20px' }}
                >
                    <PlusOutlined />
                </Button>

                <div>
                    <div className="mt-10">
                        <Radio.Group onChange={(e) => setSelectionType(e.target.value)} value={selectionType}>
                            <Radio value="checkbox">Checkbox</Radio>
                            <Radio value="radio">radio</Radio>
                        </Radio.Group>
                    </div>
                    <Divider />
                    <Table
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        </>
    );
};

export default AdminUser;
