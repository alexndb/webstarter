import ajaxError from "../ajax/ajaxError";
import ajaxSuccess from "../ajax/ajaxSuccess";

export default (form) => {
  fetch('mail.php', {
    method: 'POST',
    body: new FormData(form)
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw Error(`Запрос отклонен со статусом ${response.status}`);
      }
    })
    .then(() => {
      ajaxSuccess(form);
    })
    .catch((err) => {
      ajaxError(err);
    });
}