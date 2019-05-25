/* React */
import React from "react";

/* React Redux */
import { connect } from "react-redux";

/* React Router */
import { withRouter } from "react-router-dom";

/* Axios */
import Axios from "axios";

/* Ant Design components */
import { Modal, Form, Input, Button } from "antd";

/* Utility functions */
import { uniNameToId } from "./util";

/* Custom components */
import UniversitySelect from "../../../UniversitySelect/UniversitySelect";
import { CHANGE_MODAL_VISIBILITY } from "../../../../constants/actions";

const { Item } = Form;

const mapDispatchToProps = dispatch => ({
  handleModalToggle: e =>
    dispatch({ type: CHANGE_MODAL_VISIBILITY })
});

const mapStateToProps = state => ({
  visible: state.courseModal.visible
});

const CreateCourseModal = props => {

  const handleSubmit = e => {
    e.preventDefault();

    /* Validate the form fields */
    props.form.validateFields((err, values) => {

      /* Only submit a POST request when the form is valid */
      if (!err) {

        /* Get the field details */
        const { courseCode, courseName, university } = values;

        /* Get the ID of the university selected in the form */
        const universityId = uniNameToId(university);

        /* Submit a POST request */
        Axios.post("/api/courses", {
          courseCode: courseCode,
          courseName: courseName,
          universityId: universityId
        }).then(res => {

          /* Redirect to the course page */
          props.history.push(`/courses/${res.data}`);

          props.handleModalToggle();
        });
      }
    });
  };

  const itemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };

  return (
    <Modal
      title="Create course"
      visible={props.visible}
      onOk={props.handleModalToggle}
      onCancel={props.handleModalToggle}
      footer={[
        <Button key="cancel" onClick={props.handleModalToggle}>Cancel</Button>,
        <Button key="submit" form="create-course-modal-form" htmlType="submit" type="primary"
                onClick={handleSubmit}>Submit</Button>
      ]}
    >
      <Form
        onSubmit={handleSubmit}
        layout="horizontal"
        id="create-course-modal-form"
      >

        <Item label="Course code" {...itemLayout}>
          {props.form.getFieldDecorator("courseCode", {
            rules: [{ required: true, message: "Please enter the course code." }]
          })(
            <Input/>
          )}
        </Item>

        <Item label="Course name" {...itemLayout}>
          {props.form.getFieldDecorator("courseName", {
            rules: [{ required: true, message: "Please enter the course name." }]
          })(
            <Input/>
          )}
        </Item>

        <Item label="University" {...itemLayout}>
          {props.form.getFieldDecorator("university", {
            rules: [{ required: true, message: "Please select a university." }]
          })(
            <UniversitySelect
              placeholder="Search university"
              size="default"
            />
          )}
        </Item>

      </Form>

    </Modal>
  );
};

const WrappedModal = Form.create()(CreateCourseModal);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedModal));