<?php

include_once 'db_functions.php';
include_once 'GCM.php';
include_once 'db_connect.php';
	$db = new DB_Connect();
        $db->connect();
$tokens = array();
 $result = mysql_query("select * FROM push where  device_type='Android'");   
 //echo $result;
 //exit;
 if($result)
	{
      while($res = mysql_fetch_array($result)) {
          $tokens[] = $res['token'];
    }
   // $registatoin_ids = array($tokens);
    $registatoin_ids = $tokens;
     $gcm = new GCM();
 
    
    $message = array("price" => "GCM message for testing");
 
    $result = $gcm->send_notification($registatoin_ids, $message);
 
    echo $result;
  }
  else
  {
     echo "No data found";
  }

?>