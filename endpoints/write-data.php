<?php
    include('connection.php');
    $data=file_get_contents("php://input");
    $data = json_decode($data);
    $fileLocation = $data -> url;
    $dataToWrite = json_encode($data -> data);
    $jsonFile=fopen($fileLocation,"w");
    fwrite($jsonFile,$dataToWrite);
    echo 'success';
?>