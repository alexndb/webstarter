<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// session_start();

$mail = new PHPMailer(true);                        // Create an instance; passing `true` enables exceptions
$mail->isSMTP();                                    // Send using SMTP
$mail->SMTPAuth      = true;                        // Enable SMTP authentication
$mail->SMTPKeepAlive = true;                        // SMTP connection will not close after each email sent, reduces SMTP overhead
$mail->CharSet       = "utf-8";                     // CharSet
$mail->Host          = 'ssl://smtp.yandex.ru';      // Set the SMTP server to send through
$mail->Port          = 465;                         // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
$mail->Username      = 'username';                  // SMTP username
$mail->Password      = 'password';                  // SMTP password
$mail->SMTPDebug     = SMTP::DEBUG_SERVER;          // Enable verbose debug output
$mail->SMTPSecure    = PHPMailer::ENCRYPTION_SMTPS; // Enable implicit TLS encryption

function sendToAdmins($mail) {
  $fromAddress = 'test@test.test';
  $fromName = 'yoursite.com';
  $adminsEmails = 'email@example.com'; // 'email1@example.com, email2@example.com, ...'
  $adminEmailSubject = 'New lead from yoursite.ru';
  $get = isset($_SESSION['get']) ? $_SESSION['get'] : [];
  $data = array_merge($_POST, $get);
  $translateRu = [
    'form_name' => 'Идентификатор формы',
    'name' => 'Имя',
    'email' => 'Email',
    'phone' => 'Телефон',
    'utm_source' => 'Источник рекламы',
    'utm_medium' => 'Тип рекламы',
    'utm_campaign' => 'Кампания',
    'utm_term' => 'Ключевая фраза',
    'utm_content' => 'Содержание'
  ];

  $rowCount = 0;
  $adminMessage = '<table style="width: 100%">';
  foreach($data as $dataKey => $dataValue) {
    if ($dataValue !== '' && $dataKey !== 'agreement') {
      foreach($translateRu as $translateRuKey => $translateRuValue) {
        if ($dataKey === $translateRuKey) {
          $dataKey = $translateRuValue;
        }
      }
      $rowCount++;
      $adminMessage .= "<tr style='background-color:" . ($rowCount % 2 === 0 ? '#f8f8f8' : '#fff') . "'>
        <td style='padding: 10px 15px; border: #e9e9e9 1px solid'><b>$dataKey</b></td>
        <td style='padding: 10px 15px; border: #e9e9e9 1px solid'>$dataValue</td>
      </tr>";
    }
  }
  $adminMessage .= '</table>';

  $mail->clearAllRecipients();
  $mail->clearAttachments();
  $mail->setFrom($fromAddress, $fromName);
  $mail->addReplyTo($fromAddress, $fromName);
  foreach (explode(',', $adminsEmails) as $key) {
    $mail->addAddress($key);
  }
  $mail->Subject = $adminEmailSubject;
  $mail->msgHTML($adminMessage);
  // $mail->send();
}

function sendToUser($mail) {
  $fromAddress = 'test@test.test';
  $fromName = 'yoursite.com';
  $userEmail = $_POST['email'];
  $userEmailSubject = 'Mail from yoursite.com';
  $userMessage = '<p>Message body</p>';

  $mail->setFrom($fromAddress, $fromName);
  $mail->addReplyTo($fromAddress, $fromName);
  $mail->addAddress($userEmail);
  $mail->Subject = $userEmailSubject;
  $mail->msgHTML($userMessage);
  // $mail->addAttachment('attachment-path.pdf', 'attachment-name.pdf');
  // $mail->send();
}

try {
  // if ($_POST['form_name'] === 'user-form') {
  //   sendToUser($mail);
  //   echo 'Message has been sent to user';
  // }
  sendToAdmins($mail);
  echo 'Message has been sent to admins';
} catch (Exception $e) {
  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}