import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import CreateModal, { CreateModalProps } from '../CreateModal/CreateModal';
import YearSelect from '../YearSelect/YearSelect';
import TermSelect from '../TermSelect/TermSelect';

interface CreateExamModalProps extends CreateModalProps, RouteComponentProps, FormComponentProps {

}

const CreateExamModal: React.FC<CreateExamModalProps> = (
  {
    history,
    visible,
    handleToggleModal,
    form
  }
) => {


  return (
    <CreateModal
      title='Create an exam'
      visible={visible}
      handleToggleModal={handleToggleModal}
    >
      <Form
        onSubmit={() => {
        }}
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
            <YearSelect/>
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
            <TermSelect/>
          )}
        </Form.Item>
      </Form>
    </CreateModal>
  );
};

export default withRouter(Form.create<CreateExamModalProps>()(CreateExamModal));
