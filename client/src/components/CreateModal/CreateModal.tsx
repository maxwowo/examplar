import React from 'react';

import ToggleableModal, { ToggleableModalProps } from '../ToggleableModal/ToggleableModal';
import CreateModalFooter from '../CreateModalFooter/CreateModalFooter';

export interface CreateModalProps extends ToggleableModalProps {

}

const CreateModal: React.FC<CreateModalProps> = (
  {
    visible,
    handleToggleModal,
    ...rest
  }
) => (
  <ToggleableModal
    visible={visible}
    handleToggleModal={handleToggleModal}
    footer={
      <CreateModalFooter
        handleToggleModal={handleToggleModal}
      />
    }
    {...rest}
  />
);

export default CreateModal;
