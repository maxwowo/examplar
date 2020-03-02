import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import UniversitySelect from '../UniversitySelect/UniversitySelect';
import courseModel from '../../models/course';
import CreateModal, { CreateModalProps } from '../CreateModal/CreateModal';

interface CreateCourseModalProps extends CreateModalProps, RouteComponentProps, FormComponentProps {

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
          .then(res => {
            history.push(`/courses/${res.course.id}`);
          })
          .catch(err => {
            console.error(err);
            console.error('Create course failed');
          });
      }
    );
  };

  return (
    <CreateModal
      title="Create a course"
      visible={visible}
      handleToggleModal={handleToggleModal}
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
    </CreateModal>
  );
};

export default withRouter(Form.create<CreateCourseModalProps>()(CreateCourseModal));
