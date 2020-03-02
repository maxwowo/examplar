import React from 'react';
import { ModalProps } from 'antd/es/modal';
import { Modal } from 'antd';

export interface ToggleableModalProps extends ModalProps {
  visible: boolean;
  handleToggleModal: () => void;
}

const ToggleableModal: React.FC<ToggleableModalProps> = (
  {
    children,
    visible,
    handleToggleModal,
    ...rest
  }
) => (
  <Modal
    visible={visible}
    onOk={handleToggleModal}
    onCancel={handleToggleModal}
    {...rest}
  >
    {children}
  </Modal>
);

export default ToggleableModal;
