<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $first = $_POST['first_name'];
    $last = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $message = $_POST['message'];

    $to = "austin.newcomershub@gmail.com";
    $subject = "New Contact Form Submission";

    $body = "
    New Inquiry Submitted:

    Full Name: $first $last
    Email: $email
    Phone: $phone
    Location / Address: $address

    Inquiry / Message:
    $message
    ";

    $headers = "From: noreply@yourwebsite.com";

    mail($to, $subject, $body, $headers);

    echo "Thank you! Your message has been sent.";
}
?>