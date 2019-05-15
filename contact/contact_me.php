<?php
// check if fields passed are empty
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// create email body and send it	: line 22 (contacts@webthemez.com)
$to = 'josefumo.me@gmail.com'; // put your email
$email_subject = "Formulario submetido por:  $name";
$email_body = "Recebeste uma nova mensagem. \n\n".
				  " Aqui estao os detalhes:\n \nName: $name \n ".
				  "Email: $email_address\n Mensagem \n $message";
$headers = "From: info@mundoautomovel.co.mz\n";
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>