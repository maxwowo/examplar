import React from 'react';
import { Button } from 'antd';

interface CreateModalFooterProps {
  handleToggleModal: () => void;
}

const CreateModalFooter: React.FC<CreateModalFooterProps> = (
  {
    handleToggleModal
  }
) => (
  <React.Fragment>
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
  </React.Fragment>
);

export default CreateModalFooter;
