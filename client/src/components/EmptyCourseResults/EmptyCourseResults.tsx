import React from 'react';
import { Button, Empty } from 'antd';

import CreateCourseModal from '../CreateCourseModal/CreateCourseModal';

interface EmptyCourseResultsProps {

}

const EmptyCourseResults: React.FC<EmptyCourseResultsProps> = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div>
      <Empty
        description="No matching results"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      >
        <CreateCourseModal
          visible={modalVisible}
          handleToggleModal={handleToggleModal}
        />
        <Button
          type="primary"
          onClick={handleToggleModal}
        >
          Create course
        </Button>
      </Empty>
    </div>
  );
};

export default EmptyCourseResults;
