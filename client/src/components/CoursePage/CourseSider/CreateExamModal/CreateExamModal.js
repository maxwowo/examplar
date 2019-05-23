/* React */
import React, { Component } from "react";

/* Axios */
import Axios from "axios";

/* Ant Design components */
import { Modal, Form, Button } from "antd";

/* Custom components */
import ExamYearSelect from "./ExamYearSelect/ExamYearSelect";
import ExamTermSelect from "./ExamTermSelect/ExamTermSelect";

const { Item } = Form;

class CreateExamModal extends Component {

  state = {
    examYear: null,
    examMonth: null
  };

  handleSubmit = e => {
    e.preventDefault();

    /* Validate the form fields */
    this.props.form.validateFields((err, values) => {

      const { courseId } = this.props;
      const { examYear, examTerm } = values;

      /* Only submit a POST request when the form is valid */
      if (!err) {

        Axios.post(`/api/courses/${courseId}`, values).then(res => {
          const examId = res.data;
          this.props.handleAddExam(examId, examYear, examTerm);
        });
      }
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
        title="Add exam"
        visible={visible}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={[
          <Button key="cancel" onClick={toggleModal}>Cancel</Button>,
          <Button key="submit" form="create-exam-modal-form" htmlType="submit" type="primary"
                  onClick={this.handleSubmit}>Submit</Button>
        ]}
      >
        <Form
          onSubmit={this.handleSubmit}
          layout="horizontal"
          id="create-exam-modal-form"
        >

          <Item label="Exam year" {...itemLayout}>
            {getFieldDecorator("examYear", {
              rules: [{ required: true, message: "Please select an exam year." }]
            })(
              <ExamYearSelect/>
            )}
          </Item>

          <Item label="Exam term" {...itemLayout}>
            {getFieldDecorator("examTerm", {
              rules: [{ required: true, message: "Please select an exam term." }]
            })(
              <ExamTermSelect/>
            )}
          </Item>

        </Form>
      </Modal>
    );
  }
}

const WrappedModal = Form.create()(CreateExamModal);

export default WrappedModal;