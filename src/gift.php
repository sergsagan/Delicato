<?php

$recepient = "sergey.martynuk@gmail.com";
$sitename = "Delicato";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$recipient-name = trim($_POST["recipient-name"]);
$recipient-email = trim($_POST["recipient-email"]);
$selectPrice = trim($_POST["selectPrice"]);
$message = "Ваше имя: $name \nЭмейл: $email \nПодтверждение имени: $recipient-name \nПодтверждение email: $recipient-email \nПрайс: $selectPrice";

$pagetitle = "Новая заявка с сайта: \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset =\"utf-8\"\n From: $recepient");