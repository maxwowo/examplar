import React from 'react';
import { Button } from 'antd';

export interface CreateModalFooterProps {
  handleToggleModal: () => void;
  formId: string;
}

const CreateModalFooter: React.FC<CreateModalFooterProps> = (
  {
    handleToggleModal,
    formId
  }
) => (
  <React.Fragment>
    <Button
      key='submit'
      form={formId}
      htmlType='submit'
      type='primary'
    >
      Submit
    </Button>,
    <Button
      key='cancel'
      onClick={handleToggleModal}
    >
      Cancel
    </Button>
  </React.Fragment>
);

export default CreateModalFooter;
