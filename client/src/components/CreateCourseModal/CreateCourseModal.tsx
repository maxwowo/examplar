import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import UniversitySelect from '../UniversitySelect/UniversitySelect';

interface CreateCourseModalProps extends RouteComponentProps, FormComponentProps {
  handleToggleModal: () => void;
  visible: boolean;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = (
  {
    history,
    visible,
    handleToggleModal,
    form
  }
) => {
  const handleSubmit = () => {

  };

  const itemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };

  return (
    <Modal
      title="Create course"
      visible={visible}
      onOk={handleToggleModal}
      onCancel={handleToggleModal}
      footer={
        [
          <Button
            key="cancel"
            onClick={handleToggleModal}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            form="create-course-modal-form"
            htmlType="submit"
            type="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ]
      }
    >
      <Form
        onSubmit={handleSubmit}
        layout="horizontal"
        id="create-course-modal-form"
      >

        <Form.Item label="Course code" {...itemLayout}>
          {form.getFieldDecorator(
            'courseCode',
            {
              rules: [
                {
                  required: true,
                  message: 'Please enter the course code.'
                }
              ]
            }
          )(
            <Input/>
          )}
        </Form.Item>

        <Form.Item label="Course name" {...itemLayout}>
          {form.getFieldDecorator(
            'courseName',
            {
              rules: [
                {
                  required: true,
                  message: 'Please enter the course name.'

                }
              ]
            }
          )(
            <Input/>
          )}
        </Form.Item>

        <Form.Item label="University" {...itemLayout}>
          {form.getFieldDecorator(
            'university',
            {
              rules: [
                {
                  required: true,
                  message: 'Please select a university.'
                }
              ]
            }
          )(
            <UniversitySelect
              placeholder="Search university"
              size="default"
            />
          )}
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default withRouter(
  Form.create<CreateCourseModalProps>()(
    CreateCourseModal
  )
);
