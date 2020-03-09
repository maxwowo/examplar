import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import CreateModal from '../CreateModal/CreateModal';
import { ToggleableModalProps } from '../ToggleableModal/ToggleableModal';
import YearSelect from '../YearSelect/YearSelect';
import TermSelect from '../TermSelect/TermSelect';
import examModel from '../../models/exam';
import { notifyError } from '../../tools/errorNotifier';

interface CreateExamModalProps extends ToggleableModalProps,
  RouteComponentProps,
  FormComponentProps {
  courseId: number;
}

const CreateExamModal: React.FC<CreateExamModalProps> = (
  {
    courseId,
    history,
    visible,
    handleToggleModal,
    form
  }
) => {
  const FORM_ID = 'create-exam-modal-form';

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    form.validateFields(
      (
        err,
        {
          examYear,
          examTerm
        }
      ) => {
        if (!err) {
          examModel
            .create(
              examYear,
              examTerm,
              courseId
            )
            .then(res => {
              history.push(`/exams/${res.exam.id}`);
            })
            .catch(err => {
              notifyError(
                err,
                'Create exam failed',
                'Could not create the exam.'
              );
            });
        }
      }
    );
  };

  return (
    <CreateModal
      title='Create an exam'
      visible={visible}
      formId={FORM_ID}
      handleToggleModal={handleToggleModal}
    >
      <Form
        onSubmit={handleSubmit}
        id={FORM_ID}
      >
        <Form.Item
          hasFeedback
          label='Exam year'
        >
          {form.getFieldDecorator(
            'examYear',
            {
              rules: [
                {
                  required: true,
                  message: 'Please select the exam year'
                }
              ]
            }
          )(
            <YearSelect
              placeholder='Enter exam year'
            />
          )}
        </Form.Item>

        <Form.Item
          hasFeedback
          label='Exam term'
        >
          {form.getFieldDecorator(
            'examTerm',
            {
              rules: [
                {
                  required: true,
                  message: 'Please select the exam term'
                }
              ]
            }
          )(
            <TermSelect
              placeholder='Enter exam term'
            />
          )}
        </Form.Item>
      </Form>
    </CreateModal>
  );
};

export default withRouter(Form.create<CreateExamModalProps>()(CreateExamModal));
