import React from 'react';
import { Modal as AntModal } from 'antd';
import { ModalProps as AntModalProps } from 'antd/lib/modal';

interface ModalProps extends AntModalProps {

}

const Modal: React.FC<ModalProps> = (
  {
    children,
    ...rest
  }
) => (
  <AntModal
    {...rest}
    width={400}
  >
    {children}
  </AntModal>
);

export default Modal;
