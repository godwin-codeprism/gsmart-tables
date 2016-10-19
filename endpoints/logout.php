<?php
    include('connection.php');
    $data = json_decode(file_get_contents("php://input"));
    $token = $data -> token;
    $cleanToken = str_replace('"','',$token);
    $db -> query("UPDATE qlsusers SET token='LOGGED_OUT' WHERE token='$cleanToken'");
    echo 'LOGGED_OUT';
?>
