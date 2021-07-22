<?php

    $name = $_POST['Name']; // required
    $email = $_POST['Email']; // required
    $subject = $_POST['Subject']; // required
    $message = $_POST['Message']; // required

    $email_body = 'User Name: $name.\n'.
                    'User Email: $email.\n'.
                        'User Subject: $subject.\n'.
                            'User Message: $message.\n';

    $email_to = 'rodrigo.araujo.9731@gmail.com';

    $headers = 'From: $email \r\n';
    $headers = 'Reply-To: $email_to \r\n';

    mail($email_to, $subject, $email_body, $headers);

    // header('Location: index.html');

?>