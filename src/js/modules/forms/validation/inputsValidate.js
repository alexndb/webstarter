import validateRules from "./rules";

export default (inputs) => {
  for (let input of inputs) {
    validateRules(input);
  }
}