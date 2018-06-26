import validateRules from "./rules";

export default (selects) => {
  for (let select of selects) {
    validateRules(select);
  }
}