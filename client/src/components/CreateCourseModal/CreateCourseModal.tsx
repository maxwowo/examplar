import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import UniversitySelect from '../UniversitySelect/UniversitySelect';
import courseModel from '../../models/course';
import CreateModal from '../CreateModal/CreateModal';
import { ToggleableModalProps } from '../ToggleableModal/ToggleableModal';
import { notifyError } from '../../tools/errorNotifier';

interface CreateCourseModalProps extends ToggleableModalProps,
  RouteComponentProps,
  FormComponentProps {

}

const CreateCourseModal: React.FC<CreateCourseModalProps> = (
  {
    history,
    visible,
    handleToggleModal,
    form
  }
) => {
  const FORM_ID = 'create-course-modal-form';

  const [
    loading,
    setLoading
  ] = React.useState(false);

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
        if (!err) {
          setLoading(true);

          courseModel.create(
            courseCode,
            courseName,
            universityId
          )
            .then(res => {
              setLoading(false);
              history.push(`/courses/${res.course.id}`);
            })
            .catch(err => {
              setLoading(false);
              notifyError(
                err,
                'Create course failed',
                'Could not create the course.'
              );
            });
        }
      }
    );
  };

  return (
    <CreateModal
      title="Create a course"
      visible={visible}
      formId={FORM_ID}
      handleToggleModal={handleToggleModal}
      loading={loading}
    >
      <Form
        onSubmit={handleSubmit}
        id={FORM_ID}
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
