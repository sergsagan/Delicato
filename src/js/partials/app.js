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

	$(".select").each(function(i){
		var currentElem = $(this),
			currentSelect = $(this).find("select"),
			currentList = $(this).find(".list"),
			currentDate = $(this).find(".selected");

		$(currentDate).text(currentSelect.val());
		currentSelect.find("option").each(function(){
			currentList.append('<li>' + $(this).text() + '</li>');
		});

		currentList.on("click", "li", function(){
			currentDate.text($(this).text());
			currentSelect.val($(this).text());
		});

		$(this).click(function(){
			currentDate.hasClass('focus') ?
				currentList.slideUp(300) :
				currentList.slideDown(300);
			currentDate.toggleClass('focus');
		});
	});

	function centerModal() {
		$(this).css('display', 'block');
		var $dialog = $(this).find(".modal-dialog");
		var offset = ($(window).height() - $dialog.height()) / 2;
		// Center modal vertically in window
		$dialog.css("margin-top", offset);
	}

	$('.modal').on('show.bs.modal', centerModal);

	$(window).on("resize", function () {
		$('.modal:visible').each(centerModal);
	});

	$('.carousel').carousel();

	$(".popup").magnificPopup();

	// Fit Text Plugin for Main Header
	$("h1").fitText(
		1.2, {
			minFontSize: '26px',
			maxFontSize: '50px'
		}
	);

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

