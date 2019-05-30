/* Axios */
import Axios from "axios";

const questionHeaders = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten"
};

export const getQuestionHeader = n => `Question ${questionHeaders[n]}`;

export const getSolutions = id => {
  Axios.get(
    `/api/subquestions/${id}`
  ).then(
    res => {
      return res.data;
    }
  );
};