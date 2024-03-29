<?php
/**
 * @file
 * sample_push.php
 *
 * Push demo
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://code.google.com/p/apns-php/wiki/License
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to aldo.armiento@gmail.com so we can send you a copy immediately.
 *
 * @author (C) 2010 Aldo Armiento (aldo.armiento@gmail.com)
 * @version $Id: sample_push.php 65 2010-12-13 18:38:39Z aldo.armiento $
 */

 include_once 'db_connect.php';
	$db = new DB_Connect();
        $db->connect();
// Adjust to your timezone
date_default_timezone_set('Europe/Rome');

// Report all PHP errors
error_reporting(-1);

// Using Autoload all classes are loaded on-demand
require_once 'ApnsPHP/Autoload.php';

// Instanciate a new ApnsPHP_Push object
$push = new ApnsPHP_Push(
	ApnsPHP_Abstract::ENVIRONMENT_SANDBOX,
	'APNFINAL.pem'
);
//ENVIRONMENT_PRODUCTION , ENVIRONMENT_SANDBOX
// Set the Root Certificate Autority to verify the Apple remote peer
$push->setRootCertificationAuthority('entrust_root_certification_authority.pem');

// Connect to the Apple Push Notification Service
$push->connect();

	$result = mysql_query("select * FROM push where  device_type='iOS'");
	if($result)
	{
			while ($row = mysql_fetch_array($result)) {
				// $bannerHeadline = $row["banner_headline"];

				 				// Instantiate a new Message with a single recipient
				$message = new ApnsPHP_Message($row["token"]);

				// Set a custom identifier. To get back this identifier use the getCustomIdentifier() method
				// over a ApnsPHP_Message object retrieved with the getErrors() message.
				$message->setCustomIdentifier("Message-Badge-3");

				// Set badge icon to "3"
				$message->setBadge(3);

				// Set a simple welcome text
				$message->setText('Hello APNs-enabled device!');

				// Play the default sound
				$message->setSound();

				// Set a custom property
				$message->setCustomProperty('acme2', array('bang', 'whiz'));

				// Set another custom property
				$message->setCustomProperty('acme3', array('bing', 'bong'));

				// Set the expiry value to 30 seconds
				$message->setExpiry(30);

				// Add the message to the message queue
				$push->add($message);
			}
	}
	



// Send all messages in the message queue
$push->send();

// Disconnect from the Apple Push Notification Service
$push->disconnect();

// Examine the error message container
$aErrorQueue = $push->getErrors();
if (!empty($aErrorQueue)) {
	var_dump($aErrorQueue);
}
