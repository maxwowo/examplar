const examYears = [];
const examTerms = ["1", "2", "3", "4"];
const currentYear = new Date().getFullYear();
const examYearRange = 20;

for (let i = 0; i < examYearRange; i++)
  examYears.push((currentYear - i).toString());

export const getExamYears = () => examYears;
export const getExamTerms = () => examTerms;
