<?php
$project_name = 'yoursite.ru'; // site name
$admins_emails = 'noz2008@gmail.com'; // your mails for messages, example 'email1@gmail.com, email2@gmail.com, ...'
$mail_title = 'Новая заявка с сайта ' . $project_name; // form name
$message = '<table style="width: 100%">' . $message . '</table>'; // message styles
$c = true;

foreach ($_POST as $key => $value) {
  if ($value != '' && $key != 'project_name' && $key != 'admin_email') {

    // russian language fields
    switch ($key) {
      case 'form_name':
        $key = 'Идентификатор фомы';
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
    }

    $message .= "" . (($c = !$c) ? '<tr>' : '
      <tr style="background-color: #f8f8f8">') . "
        <td style='padding: 10px 15px; border: #e9e9e9 1px solid'><b>$key</b></td>
        <td style='padding: 10px 15px; border: #e9e9e9 1px solid'>$value</td>
      </tr>";
  }
}

function adopt($text)
{
  return '=?UTF-8?B?' . Base64_encode($text) . '?=';
}

$headers = 'MIME-Version: 1.0' . PHP_EOL .
  'Content-Type: text/html; charset=utf-8' . PHP_EOL .
  'From: ' . adopt($project_name) . ' <' . $admins_emails . '>' . PHP_EOL .
  'Reply-To: ' . $admins_emails . '' . PHP_EOL;

mail($admins_emails, adopt($mail_title), $message, $headers);