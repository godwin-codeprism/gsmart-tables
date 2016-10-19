<?php
    include('connection.php');
    $data = json_decode(file_get_contents("php://input"));
    $username = $data -> username;
    $password = sha1($data -> password);
    $userinfo = $db -> query("SELECT username FROM qlsusers WHERE username='$username' AND password='$password'");

    $userinfo = $userinfo->fetchAll();
    if(count($userinfo) == 1)
    {
        //This means user has logged in, give'em a token :D
        $token = $username ."|".uniqid().uniqid().uniqid();
        $q = "UPDATE qlsusers SET token = :token WHERE username = :username AND password = :password";
        $query = $db->prepare($q);
        $execute = $query->execute(array(
            ":token" => $token,
            ":username" => $username,
            ":password" => $password
        ));
        echo $token;
    }
    else {
        echo "ERROR";
    }

?>
