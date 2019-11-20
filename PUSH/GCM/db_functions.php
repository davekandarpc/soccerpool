<?php
 
class DB_Functions {
 
    private $db;
 
    //put your code here
    // constructor
    function __construct() {
        include_once 'db_connect.php';
        // connecting to database
        $this->db = new DB_Connect();
        $this->db->connect();
    }
 
    // destructor
    function __destruct() {
         
    }
 
    /**
     * Storing new user
     * returns user details
     */
    public function storeUser($type, $token) {
        // insert user into database
      //  echo "SELECT * FROM push WHERE token = '$token'";
      //  exit;
        $resultCheck = mysql_query("SELECT * FROM push WHERE token = '$token'");
         if (mysql_num_rows($resultCheck) > 0) {
              return "{ \"msg\": \"Device already registered\" }";
             
         }
         else
         {
               $result = mysql_query("INSERT INTO push(device_type, token) VALUES('$type', '$token')");
        // check for successful store
        if ($result) {
            // get user details
            $id = mysql_insert_id(); // last inserted id
            $result = mysql_query("SELECT * FROM push WHERE id = $id") or die(mysql_error());
            // return user details
            if (mysql_num_rows($result) > 0) {
                //return mysql_fetch_array($result);
                 return "{ \"msg\": \"Record added successfully\" }";
                 
                //return "Record added successfully";
            } else {
                return "{ \"msg\": \"Error in insert\" }";
                
                //return "Error in insert";
            }
        } else {
            return false;
        }
         }
       
    }
 
    /**
     * Getting all users
     */
    public function getAllUsers() {
        $result = mysql_query("select * FROM push");
        return $result;
    }
 
}
 
?>