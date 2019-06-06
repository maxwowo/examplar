-- Dummy courses
INSERT INTO `examplardb`.`course_table` (`course_id`, `course_code`, `course_name`, `university_id`) VALUES (NULL, 'COMP2521', 'Data Structures and Algorithms', '289');
INSERT INTO `examplardb`.`course_table` (`course_id`, `course_code`, `course_name`, `university_id`) VALUES (NULL, 'COMP1511', 'Computing Fundamentals', '289');
INSERT INTO `examplardb`.`course_table` (`course_id`, `course_code`, `course_name`, `university_id`) VALUES (NULL, 'COMP1531', 'Software Engineering Fundamentals', '289');
INSERT INTO `examplardb`.`course_table` (`course_id`, `course_code`, `course_name`, `university_id`) VALUES (NULL, 'MATH1231', 'Mathematics 1B', '289');
INSERT INTO `examplardb`.`course_table` (`course_id`, `course_code`, `course_name`, `university_id`) VALUES (NULL, 'MATH1231', 'Maths for Mathematicians', '190');

-- Dummy exams
INSERT INTO `examplardb`.`exam_table` (`exam_id`, `exam_year`, `exam_term`, `course_id`) VALUES (NULL, '2018', '2', '1');
INSERT INTO `examplardb`.`exam_table` (`exam_id`, `exam_year`, `exam_term`, `course_id`) VALUES (NULL, '2019', '1', '1');

-- Dummy questions
INSERT INTO `examplardb`.`question_table` (`question_id`, `question_header`, `exam_id`) VALUES (NULL, '2', '1');
INSERT INTO `examplardb`.`question_table` (`question_id`, `question_header`, `exam_id`) VALUES (NULL, '3', '1');

-- Dummy solutions
INSERT INTO `examplardb`.`solution_table` (`answer_id`, `answer_text`, `answer_upvotes`, `sub_question_id`) VALUES (NULL, 'Hello world', '0', '1');
INSERT INTO `examplardb`.`solution_table` (`answer_id`, `answer_text`, `answer_upvotes`, `sub_question_id`) VALUES (NULL, '\\[ \\lim_{x\\to 0}{\\frac{e^x-1}{2x}}\n \\overset{\\left[\\frac{0}{0}\\right]}{\\underset{\\mathrm{H}}{=}}\n \\lim_{x\\to 0}{\\frac{e^x}{2}}={\\frac{1}{2}}\\]', '0', '1');
