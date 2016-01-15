/**
 * Created by martynuk on 21.09.15.
 */
$(document).ready(function() {
	$("#carousel").owlCarousel({
		navigation : true,
		navigationText: [
			"<i class='icon-chevron-left'><img src='../../img/arrow-left.png' alt='arrow'></i>",
			"<i class='icon-chevron-right'><img src='../../img/arrow-right.png' alt='arrow'></i>"
		],
		slideSpeed : 300,
		paginationSpeed : 400,
		loop : true,
		autoHeight : true,
		singleItem:true
	});

	$('.carousel').carousel();

	$(".popup").magnificPopup();

	$("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "process.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
			setTimeout(function() {

				$("#form").trigger("reset");
			}, 1000);
		});
		return false;
	});

	$("#form-login").submit(function() {
		$.ajax({
			type: "POST",
			url: "login.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за регистрацию!");
			setTimeout(function() {

				$("#form-login").trigger("reset");
			}, 1000);
		});
		return false;
	});

	$('.tooltip').tooltipster({
		theme: 'tooltipster-shadow'
	});

	$(".navbar-default").sticky({topSpacing:0, className: 'sticky'});

	$("#phone").mask("+7 (999) 999-99-99");

	$('.loading').hide();
	$('input, textarea').placeholder();

	function validateForm() {
		var form_message_success = "Thank you for your email, we will be in contact with you shortly",
			form_checker = document.forms["ctsForm"]["formChecker"].value,
			data = $(this).serialize(),
			action = $(this).attr("action"),
			method = $(this).attr("method");
		// Spam Filter
		if (form_checker != "") {
			console.log("spam detected");
			return false;
		}
		$(".loading").show(); // show loading gif
		// alerts & email
		$.ajax({
			url: action,
			type: method,
			data: data,
			success: function(data) {
				$(".loading").hide();
				$('.alert-message-wrap').remove();
				$('.alert-wrap').css({'display':'block'});
				$('.alert-wrap').append('<div class="alert-message-wrap alert-success"><span class="alert-message"><i class="fa fa-check"></i>' + form_message_success + '</span></div>').delay(2000).fadeOut('slow');
			},
			error: function(err) {
				console.log('email form did not submit');
				$(".loading").hide();
				$('.alert-message-wrap').remove();
				$('.alert-wrap').css({'display':'block'});
				$('.alert-wrap').append('<div class="alert-message-wrap alert-fail"><span class="alert-message"><i class="fa fa-exclamation-circle"></i>' + form_message_success + '</span></div>').delay(2000).fadeOut('slow');
			},
			complete: function() {
				$(".loading").hide();
			}
		});
		return false;
	}


});

function toggleChevron(e) {
	$(e.target)
		.prev('.panel-heading')
		.find("i.indicator")
		.toggleClass('glyphicon-minus glyphicon-plus ');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);


//в этой функции отслеживается изменение чекбокса
$(document).on('change', '.form input:checkbox', function() {
	if($(this).is(':checked')){
		$(".form button[type=submit]").removeAttr('disabled');
		$('.form input[type=hidden].valTrFal').val('valTrFal_true');
	}
	else {
		$(".form button[type=submit]").attr('disabled','disabled');
		$('.form input[type=hidden].valTrFal').val('valTrFal_disabled');
	}
});

$(document).ready(function() {
	$('#form-registration').validate({
		rules:{
			password:{
				required:true,
				rangelength:[4,8]
			},
			confirm_password:{
				equalTo:'#password'
			}
		},//конец rules
		messages:{
			password:{
				required: "Вы не ввели пароль",
				rangelength:"Пароль должен содержать от 4 до 8 символов"
			},
			confirm_password:{
				equalTo:"Пароли не совпадают"
			}
		}//конец messages
	});//конец validate
});//конец ready

