import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import CreateModal, { CreateModalProps } from '../CreateModal/CreateModal';

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

    </CreateModal>
  );
};

export default withRouter(Form.create<CreateExamModalProps>()(CreateExamModal));
