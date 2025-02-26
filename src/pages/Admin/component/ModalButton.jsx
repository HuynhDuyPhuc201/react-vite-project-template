import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const ModalButton = ({ title, onClick }) => {
    return (
        <div className="pr-10">
            <h1>{title}</h1>
            <Button
                onClick={onClick}
                className="p-20 border plus-border flex items-center justify-center w-[100px] h-[100px] mt-5 cursor-pointer"
                style={{ border: '1px solid', padding: '20px' }}
            >
                <PlusOutlined />
            </Button>
        </div>
    );
};
