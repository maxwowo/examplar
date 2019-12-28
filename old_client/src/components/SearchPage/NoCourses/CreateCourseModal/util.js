import universities from "../../../../constants/universities";

export const uniNameToId = name => {
  return universities.indexOf(name);
};
