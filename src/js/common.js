$(document).ready(function() {

	// add css to html
	$('<!-- Загрузка стилей CSS --><link rel="stylesheet" href="css/libs.min.css"><link rel="stylesheet" href="css/main.css"><!-- Загрузка стилей CSS конец -->').appendTo('head');

	// popups
	$('.popup').magnificPopup();

	// phone mask
	$('input[type=tel]').mask("+7 (999) 999-9999", {autoclear: false});

	// no drag images and links
	$("img, a").on('dragstart', function(e) { e.preventDefault(); });

	// selects
	var selects = $("select");
	selects.each(function(){
		var dataPlaceholder = $(this).attr('data-placeholder');
		$(this).select2({
			minimumResultsForSearch: Infinity,
			placeholder: dataPlaceholder
		});
	});

	// form submit and validate
	$('input').focus(function() {
		$(this).addClass('active');
		$(this).removeClass('c-error');
	});
	$('input').blur(function() {
		if ( $(this).val() != '' ) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});

	$('form').submit(function(e) {

		var th = $(this);
		var inputs = th.find('input');

		var magnificPopup = $.magnificPopup.instance;
		var thankyouName = $('input[name=name]').val();
		var thankyouPhoneNumber = $('input[type=tel]').val();

		var namePattern =/^[А-Яа-яЁё\s]+$/;
		var emailPattern =/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
		var phonePattern =/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

		inputs.each(function(i, el) {

			if ($(el).val() == '') {
				$(el).addClass('c-error');
				console.log('ok');
			} else {
				$(el).removeClass('c-error');
			}

			if ($('.c-error').length == 0) {

				// $.ajax({
				// 	type: "POST",
				// 	url: "mail.php",
				// 	data: th.serialize()
				// }).done(function() {
				// 	$.magnificPopup.close();
				// 	$.magnificPopup.open({
				// 		items: {
				// 			src: '<div class="c-popup-default c-popup-thankyou" id="popup-thankyou"><div class="c-popup-default-inner"><h2 class="c-popup-default-title">Спасибо за заявку, ' + thankyouName + '!</h2><p>Мы перезвоним вам в ближайшее время по номеру ' + '<span>' + thankyouPhoneNumber + '</span>' + '</p></div></div>',
				// 			type: 'inline'
				// 		}
				// 	});
				// 	setTimeout(function() {
				// 		th.trigger("reset");
				// 		// $('.c-valid').removeClass('c-valid');
				// 		// $('.c-error').removeClass('c-error');
				// 		// $('.c-text-error').removeClass('c-text-error');
		 	// 			//$.magnificPopup.close();
		 	// 		}, 2000);
				// });

				

			}

		});

		e.preventDefault();

	});

	// resolution events
	var ww = window.innerWidth;

	if (ww >= 992) {
		console.log('больше 992')
	} else {
		console.log('меньше 992')
	}


	// resize events
	$(window).resize(function() {

		var ww = window.innerWidth;

		if (ww >= 992) {
			console.log('больше 992')
		} else {
			console.log('меньше 992')
		}

	});

});