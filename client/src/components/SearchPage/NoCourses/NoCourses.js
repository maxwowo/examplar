/* React */
import React from "react";

/* Ant Design components */
import { Typography, Button, Empty } from "antd";

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
    <Empty
      description="No matching results"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    >
      <Button
        type="primary"
        onClick={handleModalToggle}
      >
        Create course
      </Button>
    </Empty>
  </div>
);

export default NoCourses;
