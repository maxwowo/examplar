/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Modal, Form, Input, Button } from "antd";

/* Custom components */
import UniversitySelect from "../../UniversitySelect/UniversitySelect";

const { Item } = Form;

class CreateCourseModal extends Component {
  state = {
    courseCode: null,
    courseName: null,
    university: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) console.log("Received values of form:", values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const itemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const { visible, toggleModal } = this.props;

    return (
      <Modal
        title="Create course"
        visible={visible}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={[
          <Button key="cancel" onClick={toggleModal}>Cancel</Button>,
          <Button key="submit" form="create-course-modal-form" htmlType="submit" type="primary"
                  onClick={this.handleSubmit}>Submit</Button>
        ]}
      >
        <Form
          onSubmit={this.handleSubmit}
          layout="horizontal"
          id="create-course-modal-form"
        >

          <Item label="Course Code" {...itemLayout}>
            {getFieldDecorator("courseCode", {
              rules: [{ required: true, message: "Please enter the course code." }]
            })(
              <Input onChange={e => this.setState({ courseCode: e.target.value })}/>
            )}
          </Item>

          <Item label="Course Name" {...itemLayout}>
            {getFieldDecorator("courseName", {
              rules: [{ required: true, message: "Please enter the course name." }]
            })(
              <Input onChange={e => this.setState({ courseName: e.target.value })}/>
            )}
          </Item>

          <Item label="University" {...itemLayout}>
            {getFieldDecorator("university", {
              rules: [{ required: true, message: "Please select a university." }]
            })(
              <UniversitySelect
                placeholder="Search university"
                onSelect={e => this.setState({ university: e })}
                size="default"
                id=""
              />
            )}
          </Item>

        </Form>
      </Modal>
    );
  }
}

const WrappedModal = Form.create()(CreateCourseModal);

export default WrappedModal;