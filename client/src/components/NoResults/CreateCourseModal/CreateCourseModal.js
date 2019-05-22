/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Modal, Form, Select, Input } from "antd";

/* Custom components */
import UniversitySelect from "../../UniversitySelect/UniversitySelect";

const { Item } = Form;

class CreateCourseModal extends Component {
  handleSubmit = e => {

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const itemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
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
            {getFieldDecorator("courseCode", {
              rules: [{ required: true, message: "Please enter the course code." }]
            })(
              <Input/>
            )}
          </Item>

          <Item label="Course Name" {...itemLayout}>
            {getFieldDecorator("courseName", {
              rules: [{ required: true, message: "Please enter the course name." }]
            })(
              <Input/>
            )}
          </Item>

          <Item label="University" {...itemLayout}>
            <UniversitySelect
              placeholder="Search university"
              size="medium"
            />
          </Item>

        </Form>
      </Modal>
    );
  }
}

const WrappedModal = Form.create({ name: "coordinated" })(CreateCourseModal);

export default WrappedModal;