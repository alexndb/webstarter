<?php
session_start();
$get = $_SESSION['get'];

$project_name = 'yoursite.ru';
$admins_emails = 'email@example.com'; // 'email1@gmail.com, email2@gmail.com, ...'
$mail_title = 'Новая заявка с сайта ' . $project_name;
$message = '<table style="width: 100%">' . $message . '</table>';
$c = true;

foreach(array_merge($_POST, $get) as $key => $value) {
  if ($value != '' && $key != 'project_name' && $key != 'admin_email' && $key != 'agreement') {
    switch ($key) {
      case 'form_name':
        $key = 'Идентификатор формы';
        continue;
      case 'name':
        $key = 'Имя';
        continue;
      case 'email':
        $key = 'Email';
        continue;
      case 'phone':
        $key = 'Телефон';
        continue;
      case 'text':
        $key = 'Сообщение';
        continue;
      case 'select':
        $key = 'Пункт списка';
        continue;
      case 'utm_source':
        $key = 'Источник рекламы';
        continue;
      case 'utm_medium':
        $key = 'Тип рекламы';
        continue;
      case 'utm_campaign':
        $key = 'Кампания';
        continue;
          case 'utm_term':
        $key = 'Ключевая фраза';
        continue;
      case 'utm_content':
        $key = 'Содержание';
        continue;
    }

    $message .= "" . (($c = !$c) ? '<tr>' : '
      <tr style="background-color: #f8f8f8">') . "
        <td style='padding: 10px 15px; border: #e9e9e9 1px solid'><b>$key</b></td>
        <td style='padding: 10px 15px; border: #e9e9e9 1px solid'>$value</td>
      </tr>";
  }
}

function adopt($text) {
  return '=?UTF-8?B?' . Base64_encode($text) . '?=';
}

$headers = 'MIME-Version: 1.0' . PHP_EOL .
  'Content-Type: text/html; charset=utf-8' . PHP_EOL .
  'From: ' . adopt($project_name) . ' <' . $admins_emails . '>' . PHP_EOL .
  'Reply-To: ' . $admins_emails . '' . PHP_EOL;

mail($admins_emails, adopt($mail_title), $message, $headers);