<?php
header("Access-Control-Allow-Origin: *");
    if(isset($_FILES['file'])){
        $saveTo = $_POST['saveToUrl'];
        $originalName = $_FILES['file']['name'];
        $extension = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
        $generatedName = md5($_FILES['file']['tmp_name']).$extension;
        $filePath = $saveTo.'/'.$generatedName;
    
        if(!is_writable($saveTo)){
            echo json_encode(array(
                'status' => false,
                'message' => 'Destination directory not writable.'
            ));
            exit;
        }

        if(move_uploaded_file($_FILES['file']['tmp_name'], $filePath)){
            echo json_encode(array(
                'status' => true,
                'originalName' => $originalName,
                'generatedName' => $generatedName,
                'savedTo' => $filePath
            ));
        }
    }
    else {
    echo json_encode(
        array('status' => false, 'msg' => 'No file uploaded.')
    );
    exit;
}
?>