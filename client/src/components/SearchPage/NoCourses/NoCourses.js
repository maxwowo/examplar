/* React */
import React from "react";

/* Ant Design components */
import { Typography, Button } from "antd";

/* Custom components */
import CreateCourseModal from "./CreateCourseModal/CreateCourseModal";

const { Paragraph } = Typography;

const NoCourses = (
  {
    handleModalToggle
  }
) => (
  <div>
    <CreateCourseModal
      handleModalToggle={handleModalToggle}
    />
    <Paragraph>Your search did not match any courses</Paragraph>
    <Button
      type="primary"
      onClick={handleModalToggle}
    >
      Create course
    </Button>
  </div>
);

export default NoCourses;
