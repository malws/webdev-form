<?php
 
//CORS things
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Cookie,Accept');

//Get data from the form
$data = json_decode(file_get_contents("php://input"), true);
if( !isset($data)) {
    $result = 'failed';
}
else {
    $task = $data['emailAddress'] . $data['customerName'] . $data['enquiry'];
    $result = 'success';
    
    //Sanitizing data 
    $customerName = sanitizeData($data['customerName']);
    $emailAddress = sanitizeData($data['emailAddress']);
    $enquiry = sanitizeData($data['enquiry']);

    //using PHP Data Objects to communicate with the database
    $pdo = new PDO(    'mysql:host=localhost;dbname=form_submissions;charset=utf8mb4',
                    'root',
                    '',
                    array(
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                    )
                );
    $handle = $pdo->prepare("INSERT INTO submissions (Name, Email, Enquiry) VALUES ('".$customerName."','".$emailAddress."', '".$enquiry."')");
    $handle->execute();

    //Sending emails
    $subject = 'Thank you for your enquiry';
    $message = 'Hello, we received your enquiry. We will contact you soon. Regards, XYZ.';
    $headers = 'From: webmaster@example.com' . "\r\n" .
        'Content-type:text/html;charset=UTF-8' . "\r\n".
        'Reply-To: webmaster@example.com';

    mail($emailAddress, $subject, $message, $headers);

    $to = '​enquiries@example.com​';
    $subject = 'A new enquiry has been submitted';
    $message = 'Hello, a new enquiry has been submitted. Login to the admin dashboard to read and reply.';
    $headers = 'From: webmaster@example.com' . "\r\n" .
        'Content-type:text/html;charset=UTF-8' . "\r\n".
        'Reply-To: webmaster@example.com';

    mail($to, $subject, $message, $headers);
}

//Data sanitizing function
function sanitizeData($data)
{
    $data = stripslashes($data);
    $data = htmlentities($data);
    $data = strip_tags($data);
    return $data;
}