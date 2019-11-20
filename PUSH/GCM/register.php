<?php
 
// response json
$json = array();
 
/**
 * Registering a user device
 * Store reg id in users table
 */
if (isset($_GET["type"]) && isset($_GET["token"]) ) {
    $type = $_GET["type"];
    $token = $_GET["token"];
   // $gcm_regid = $_POST["regId"]; // GCM Registration ID
    // Store user details in db
    include_once 'db_functions.php';
    include_once 'GCM.php';
 
    $db = new DB_Functions();
    $gcm = new GCM();
 
    $res = $db->storeUser($type, $token);
 
    //$registatoin_ids = array($token);
   // $message = array("product" => "shirt");
 
   // $result = $gcm->send_notification($registatoin_ids, $message);
 
    echo $res;
} else {
    // user details missing
}
?>