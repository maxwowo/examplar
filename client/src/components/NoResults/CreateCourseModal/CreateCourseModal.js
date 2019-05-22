/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Modal, Form, Select, Input } from "antd";

const { Item } = Form;

class CreateCourseModal extends Component {
  handleSubmit = e => {

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const itemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };

    return (
      <Modal
        title="Create course"
        visible={this.props.visible}
        onOk={this.props.toggleModal}
        onCancel={this.props.toggleModal}
      >
        <Form
          onSubmit={this.handleSubmit}
          layout="horizontal"
        >

          <Item label="Course Code" {...itemLayout}>
            <Input/>
          </Item>

          <Item label="Course Name" {...itemLayout}>
            <Input/>
          </Item>

        </Form>
      </Modal>
    );
  }
}

const WrappedModal = Form.create({ name: "coordinated" })(CreateCourseModal);

export default WrappedModal;