/* React */
import React from "react";

/* Ant Design components */
import { Button, Empty } from "antd";

/* Custom components */
import CreateCourseModal from "./CreateCourseModal/CreateCourseModal";

const NoCourses = (
  {
    handleToggleModal
  }
) => (
  <div>
    <CreateCourseModal
      handleToggleModal={handleToggleModal}
    />
    <Empty
      description="No matching results"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    >
      <Button
        type="primary"
        onClick={handleToggleModal}
      >
        Create course
      </Button>
    </Empty>
  </div>
);

export default NoCourses;
