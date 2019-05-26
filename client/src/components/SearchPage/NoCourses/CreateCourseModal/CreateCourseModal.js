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

const { Item } = Form;

const mapStateToProps = state => (
  {
    visible: state.courseModal.visible
  }
);

const CreateCourseModal = (
  {
    form,
    history,
    handleModalToggle,
    visible
  }
) => {

  const handleSubmit = e => {
    e.preventDefault();

    /* Validate the form fields */
    form.validateFields(
      (
        err,
        {
          courseCode,
          courseName,
          university
        }
      ) => {

        /* Only submit a POST request when the form is valid */
        if (!err) {

          /* Get the ID of the university selected in the form */
          const universityId = uniNameToId(university);

          /* Submit a POST request */
          Axios.post(
            "/api/courses",
            {
              courseCode: courseCode,
              courseName: courseName,
              universityId: universityId
            }
          ).then(
            res => {

              /* Redirect to the course page */
              history.push(`/courses/${res.data}`);

              handleModalToggle();
            }
          );
        }
      }
    );
  };

  const itemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };

  return (
    <Modal
      title="Create course"
      visible={visible}
      onOk={handleModalToggle}
      onCancel={handleModalToggle}
      footer={[
        <Button key="cancel" onClick={handleModalToggle}>Cancel</Button>,
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
          {form.getFieldDecorator(
            "courseCode",
            {
              rules: [
                {
                  required: true,
                  message: "Please enter the course code."
                }
              ]
            }
          )(
            <Input/>
          )}
        </Item>

        <Item label="Course name" {...itemLayout}>
          {form.getFieldDecorator(
            "courseName",
            {
              rules: [
                {
                  required: true,
                  message: "Please enter the course name."

                }
              ]
            }
          )(
            <Input/>
          )}
        </Item>

        <Item label="University" {...itemLayout}>
          {form.getFieldDecorator(
            "university",
            {
              rules: [
                {
                  required: true,
                  message: "Please select a university."
                }
              ]
            }
          )(
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

export default withRouter(connect(mapStateToProps)(WrappedModal));