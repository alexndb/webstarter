function ajaxError() {
    alert('Что-то пошло не так, пожалуйста, свяжитесь с администратором');
    location.reload();
}

export default {
    ajaxError: ajaxError
}