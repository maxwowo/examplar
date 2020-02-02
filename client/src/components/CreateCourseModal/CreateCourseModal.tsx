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

        <Form.Item
          label="Course code"
        >
          {form.getFieldDecorator(
            'courseCode',
            {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Please enter the course code.'
                }
              ]
            }
          )(
            <Input
              placeholder='Enter course code'
            />
          )}
        </Form.Item>

        <Form.Item
          label="Course name"
        >
          {form.getFieldDecorator(
            'courseName',
            {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Please enter the course name.'

                }
              ]
            }
          )(
            <Input
              placeholder='Enter course name'
            />
          )}
        </Form.Item>

        <Form.Item
          label="University"
        >
          {form.getFieldDecorator(
            'university',
            {
              rules: [
                {
                  required: true,
                  whitespace: true,
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
