/* React */
import React, { Component } from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Typography, Button } from "antd";

/* Custom components */
import CreateCourseModal from "./CreateCourseModal/CreateCourseModal";

/* Constants */
import { CHANGE_MODAL_VISIBILITY } from "../../../constants/actions";

const { Paragraph } = Typography;

const mapDispatchToProps = dispatch => ({
  handleModalToggle: e =>
    dispatch({ type: CHANGE_MODAL_VISIBILITY })
});

const NoCourses = props => (
  <div>
    <CreateCourseModal/>
    <Paragraph>Your search did not match any courses</Paragraph>
    <Button
      type="primary"
      onClick={props.handleModalToggle}
    >
      Create course
    </Button>
  </div>
);

export default connect(null, mapDispatchToProps)(NoCourses);