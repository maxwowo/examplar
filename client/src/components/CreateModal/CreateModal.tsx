import React from 'react';

import ToggleableModal, { ToggleableModalProps } from '../ToggleableModal/ToggleableModal';
import CreateModalFooter, { CreateModalFooterProps } from '../CreateModalFooter/CreateModalFooter';

export interface CreateModalProps extends ToggleableModalProps, CreateModalFooterProps {

}

const CreateModal: React.FC<CreateModalProps> = (
  {
    visible,
    handleToggleModal,
    formId,
    ...rest
  }
) => (
  <ToggleableModal
    visible={visible}
    handleToggleModal={handleToggleModal}
    footer={
      <CreateModalFooter
        handleToggleModal={handleToggleModal}
        formId={formId}
      />
    }
    {...rest}
  />
);

export default CreateModal;
