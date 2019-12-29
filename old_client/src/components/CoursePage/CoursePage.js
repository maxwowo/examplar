/* React */
import React, { Component } from "react";

/* Redux */
import { connect } from "react-redux";

/* Constants */
import {
  UPDATE_EXAM_MODAL_VISIBILITY,
  SET_COURSE_INFO,
  UPDATE_EXAMS
} from "../../constants/actions";

/* Ant Design components */
import { Row, Col } from "antd";

/* Axios */
import Axios from "axios";

/* Custom components */
import CourseSider from "./CourseSider/CourseSider";
import CourseContent from "./CourseContent/CourseContent";

/* Styles */
import "./CoursePage.less";

const mapStateToProps = state => (
  {
    exams: state.course.exams,
    courseName: state.course.courseName,
    courseCode: state.course.courseCode,
    universityName: state.course.universityName
  }
);

const mapDispatchToProps = dispatch => (
  {
    handleSetCourseInfo: (
      {
        courseName,
        courseCode,
        universityName,
        exams,
        courseId
      }
    ) => dispatch(
      {
        courseName: courseName,
        courseCode: courseCode,
        universityName: universityName,
        exams: exams,
        courseId: courseId,
        type: SET_COURSE_INFO
      }
    ),
    handleUpdateExams: exams => dispatch(
      {
        exams: exams,
        type: UPDATE_EXAMS
      }
    ),
    handleToggleModal: () => dispatch(
      {
        type: UPDATE_EXAM_MODAL_VISIBILITY
      }
    )
  }
);

class CoursePage extends Component {

  /* Sort the list of exams by
  *  1. Descending order of year
  *  2. Descending order of term */
  sortExams = () => {

    /* Create a duplicated list of exams */
    const examsDup = [...this.props.exams];

    /* Sort the duplicated exams */
    examsDup.sort(
      (a, b) => (
        a.examYear === b.examYear ?
          -(a.examTerm - b.examTerm) :
          -(a.examYear - b.examYear)
      )
    );

    /* Update the states */
    this.props.handleUpdateExams(examsDup);
  };

  componentDidMount() {

    /* Get the course ID from the URL */
    const courseId = this.props.match.params.courseId;

    /* Get information about the course */
    Axios.get(
      `/api/courses/${courseId}`
    ).then(
      res => {

        /* Get the response data */
        const {
          courseCode,
          courseName,
          exams,
          universityName
        } = res.data;

        /* Update the states using the data */
        this.props.handleSetCourseInfo(
          {
            courseName: courseName,
            courseCode: courseCode,
            universityName: universityName,
            exams: exams,
            courseId: courseId
          }
        );

        /* Sort the exams */
        this.sortExams();
      }
    );
  }

  render() {

    return (
      <div
        id="course-page-container"
        className="container-width"
      >
        <Row
          type="flex"
          justify="space-between"
        >

          <Col xs={24} md={10}>
            <CourseSider
              handleToggleModal={this.props.handleToggleModal}
            />
          </Col>

          <Col xs={24} md={12}>
            <CourseContent/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);