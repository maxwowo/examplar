import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import UniversitySelect from '../UniversitySelect/UniversitySelect';
import courseModel, { CreateBody } from '../../models/course';

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
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    form.validateFields(
      (
        err,
        {
          courseCode,
          courseName,
          universityId
        }
      ) => {
        courseModel.create(
          courseCode,
          courseName,
          universityId
        )
          .then(
            (
              res: CreateBody
            ) => {
              history.push(`/courses/${res.course.id}`)
            }
          )
          .catch(
            (err) => {
              console.error(err);
              console.error('Create course failed');
            }
          );
      }
    );
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
            key="submit"
            form="create-course-modal-form"
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>,
          <Button
            key="cancel"
            onClick={handleToggleModal}
          >
            Cancel
          </Button>
        ]
      }
    >
      <Form
        onSubmit={handleSubmit}
        id="create-course-modal-form"
      >

        <Form.Item
          hasFeedback
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
          hasFeedback
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
          hasFeedback
          label="University"
        >
          {form.getFieldDecorator(
            'universityId',
            {
              rules: [
                {
                  required: true,
                  type: 'integer',
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
