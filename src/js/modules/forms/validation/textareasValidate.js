import validateRules from "./rules";

export default (textareas) => {
  for (let textarea of textareas) {
    validateRules(textarea);
  }
}