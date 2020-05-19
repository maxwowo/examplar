import React from 'react';
import { Button } from 'antd';

export interface CreateModalFooterProps {
  handleToggleModal: () => void;
  formId: string;
  loading: boolean;
}

const CreateModalFooter: React.FC<CreateModalFooterProps> = (
  {
    handleToggleModal,
    formId,
    loading
  }
) => (
  <React.Fragment>
    <Button
      key='submit'
      form={formId}
      htmlType='submit'
      type='primary'
      loading={loading}
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
