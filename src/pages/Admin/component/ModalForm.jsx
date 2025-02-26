import { Col, Modal, Row } from 'antd';
import { FormProvider } from 'react-hook-form';
import InputForm from '~/components/InputForm';

export const ModalForm = ({ title, isOpen, onCancel, methods, onSubmit, fields }) => {
    return (
        <FormProvider {...methods}>
            <Modal title={title} open={isOpen} onCancel={onCancel} footer={null}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Row gutter={[18, 18]}>
                        {fields.map((field) => (
                            <Col md={12} key={field.name}>
                                <label className="block text-gray-700">{field.label}</label>
                                <InputForm
                                    error={methods.formState.errors[field.name]}
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    type="text"
                                />
                            </Col>
                        ))}
                        <div className="flex items-center justify-center w-full">
                            <button className="w-1/2 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                {title}
                            </button>
                        </div>
                    </Row>
                </form>
            </Modal>
        </FormProvider>
    );
};
