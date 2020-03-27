import React from 'react';
import { ModalProps } from 'antd/es/modal';
import Modal from '../Modal/Modal';

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
    {...rest}
    visible={visible}
    onOk={handleToggleModal}
    onCancel={handleToggleModal}
  >
    {children}
  </Modal>
);

export default ToggleableModal;
