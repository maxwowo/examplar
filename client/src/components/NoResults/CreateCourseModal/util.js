import universities from "../../../constants/universities";

export const uniNameToID = name => {
  console.log(name)
  return universities.indexOf(name) + 1;
};
