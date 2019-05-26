/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* React Router */
import { withRouter } from "react-router-dom";

/* Axios */
import Axios from "axios";

/* Ant Design components */
import { Modal, Form, Button } from "antd";

/* Custom components */
import ExamYearSelect from "./ExamYearSelect/ExamYearSelect";
import ExamTermSelect from "./ExamTermSelect/ExamTermSelect";

/* Constants */
import { CHANGE_EXAM_MODAL_VISIBILITY } from "../../../../constants/actions";

const { Item } = Form;

const mapStateToProps = state => (
  {
    exams: state.course.exams,
    courseId: state.course.courseId,
    modalVisible: state.course.modalVisible
  }
);

const mapDispatchToProps = dispatch => (
  {
    handleModalToggle: e => dispatch(
      {
        type: CHANGE_EXAM_MODAL_VISIBILITY
      }
    )
  }
);

const CreateExamModal = props => {

  const { getFieldDecorator } = props.form;
  const itemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };

  const handleSubmit = e => {
    e.preventDefault();

    /* Validate the form fields */
    props.form.validateFields((err, values) => {

        /* Only submit a POST request when the form is valid */
        if (!err) {

          Axios.post(`/api/courses/${props.courseId}`, values).then(res => {

              props.history.push(`/exams/${res.data}`);

              props.handleModalToggle();
            }
          );
        }
      }
    );
  };

  return (
    <Modal
      title="Add exam"
      visible={props.modalVisible}
      onOk={props.handleModalToggle}
      onCancel={props.handleModalToggle}
      footer={[
        <Button key="cancel" onClick={props.handleModalToggle}>Cancel</Button>,
        <Button key="submit" form="create-exam-modal-form" htmlType="submit" type="primary"
                onClick={handleSubmit}>Submit</Button>
      ]}
    >
      <Form
        onSubmit={handleSubmit}
        layout="horizontal"
        id="create-exam-modal-form"
      >

        <Item label="Exam year" {...itemLayout}>
          {getFieldDecorator("examYear", {
              rules: [{ required: true, message: "Please select an exam year." }]
            }
          )(
            <ExamYearSelect/>
          )
          }
        </Item>

        <Item label="Exam term" {...itemLayout}>
          {getFieldDecorator(
            "examTerm",
            {
              rules: [{ required: true, message: "Please select an exam term." }]
            }
          )(
            <ExamTermSelect/>
          )
          }
        </Item>

      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(CreateExamModal);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedModal));