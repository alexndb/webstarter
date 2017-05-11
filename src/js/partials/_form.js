$(document).ready(function() {

	/* ================================================== ADD CSS LINKS TO HTML ================================================== */

	$('<!-- Загрузка стилей CSS --><link rel="stylesheet" href="css/libs.min.css"><link rel="stylesheet" href="css/main.min.css"><!-- Загрузка стилей CSS конец -->').appendTo('head');



	/* ================================================== LIBS ================================================== */

	// popups
	$('.js-popup').magnificPopup();

	// phone mask
	$('input[type=tel]').mask("+7 (999) 999-9999", {autoclear: false});

	// no drag images and links
	$("img, a").on('dragstart', function(e) { e.preventDefault(); });



	/* ================================================== RESOLUTION EVENTS ================================================== */

	var ww = window.innerWidth;

	if (ww >= 992) {
		console.log('больше 992')
	} else {
		console.log('меньше 992')
	}



	/* ================================================== RESIZE EVENTS ================================================== */

	$(window).on('resize', function() {

		var ww = window.innerWidth;

		if (ww >= 992) {
			console.log('больше 992')
		} else {
			console.log('меньше 992')
		}

	});



	/* ================================================== SELECTS ================================================== */

	var selects = $("select");

	selects.each(function() {

		var select      = $(this),
		dataPlaceholder = select.attr('data-placeholder');

		select.select2({
			minimumResultsForSearch: Infinity,
			placeholder: dataPlaceholder
		});
	});



	/* ================================================== INPUTS EFFECTS ================================================== */

	$('input').on('focus', function() {
		$(this).addClass('active');
	});

	$('input').on('blur', function() {
		if ($(this).val() != '') {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});



	/* ================================================== FORMS ================================================== */

	var forms = $('form'); // выбираем все формы на странице

	forms.each(function() { // перебираем все формы на странице

		var form                = $(this), // берем текущую форму
			inputs              = form.find('[data-validate="true"]'), // выбираем внутри нее элементы с [data-validate="true"]

			// patterns
			namePattern         = /^[А-Яа-яЁё\s]+$/, // pattern для поля name
			emailPattern        = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/, // pattern для поля email
			phonePattern        = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/; // pattern для поля phone

		// form validation
		function formValidate() {

			$(".c-form-error-message").remove(); // удаляем ошибки перед следующей проверкой

			inputs.each(function() { // перебираем все элементы с [data-validate="true"]

				var input = $(this), // берем каждый элемент
					value = input.val(); // берем значение каждого элемента

				// Функция показа вывода ошибок
				function showError(text) { input.after('<div class="c-form-error-message">'+ text +'</div>'); } 

				// осуществляем проверку элементов на ошибки
				if ( value == '' ) { // если значение элемента путое

					input.addClass('c-error'); // добавляем элементу класс с ошибкой
					showError("Заполните поле"); // выводим ошибку

				} else if ( input.attr('name') == 'name' && !namePattern.test(value) ) { // проверка name на соответствие pattern

					input.addClass('c-error');  // добавляем элементу класс с ошибкой
					showError("Только русские буквы без цифр"); // выводим ошибку

				} else if ( input.attr('name') == 'name' && input.val().length < 2 ) { // проверка name на количество символов

					input.addClass('c-error');  // добавляем элементу класс с ошибкой
					showError("Минимальная длина 2 символа"); // выводим ошибку

				} else if ( input.attr('name') == 'email' && !emailPattern.test(value) ) { // проверка email на соответствие pattern

					input.addClass('c-error');  // добавляем элементу класс с ошибкой
					showError("Формат youremail@example.ru"); // выводим ошибку

				} else if ( input.attr('name') == 'phone' && !phonePattern.test(value) ) { // проверка phone на соответствие pattern

					input.addClass('c-error');  // добавляем элементу класс с ошибкой
					showError("Формат ввода +7 (999) 999-9999"); // выводим ошибку

				} else if ( input.attr('name') == 'text' && input.val().length < 30 ) { // проверка name на количество символов

					input.addClass('c-error');  // добавляем элементу класс с ошибкой
					showError("Минимальная длина 30 символов"); // выводим ошибку

				} else {

					input.removeClass('c-error'); // удаляем у элемента класс с ошибкой

				}

			}); // inputs each end

		} // form validation end

		// form submit
		form.on('submit', function(e) {

			e.preventDefault(); // отменяем стандартную отправку формы

			formValidate(form); // запускаем валидацию

			// check form errors
			if ($('.c-error').length == 0) {

				$.ajax({
					type: "POST",
					url: "mail.php",
					data: form.serialize()
				}).done(function() { // при успешной отправке

					var thankyouName        = form.find($('input[name=name]')).val(), // берем значение поля "name" для попапа "Спасибо"
						thankyouPhoneNumber = form.find($('input[type=tel]')).val(); // берем значение поля "phone" для попапа "Спасибо"

					$.magnificPopup.close(); // закрытие попапа с формой при необходимости
					$.magnificPopup.open({ // открытие попапа "Спасибо"
						items: { // разметка попапа "Спасибо"
							src:
							'<div class="c-popup-default c-popup-thankyou" id="popup-thankyou">' +
								'<div class="c-popup-default-inner">' +
									'<h2 class="c-popup-default-title">Спасибо за заявку, ' + thankyouName + '!</h2>' +
									'<p>Мы перезвоним вам в ближайшее время по номеру ' + '<span>' + thankyouPhoneNumber + '</span>' + '</p>' +
								'</div>' +
							'</div>',
							type: 'inline'
						},
						showCloseBtn: false // отключаем кнопку закрыть в попапе "Спасибо"
					});

					setTimeout(function() { // действия по ситечению указанного времени (6000)

						form.trigger("reset"); // сброс значений полей ввода формы
						$.magnificPopup.close(); // закрытие попапа "Спасибо"

					}, 6000);

				}).error(function() { // при неудачной отправке

					alert('Что-то пошло не так, пожалуйста, свяжитесь с администратором'); // выводим alert
					location.reload(); // обновляем страницу

				}); // ajax done end

			} // check form errors end

		}); // form submit end

	}); // forms each end

}); // document ready end