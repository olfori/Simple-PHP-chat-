<?php

class DB{

	//Connect with DB
	public static function init(){
		mysql_connect(	'localhost', 
						'root', 
						'');
		mysql_select_db('chat_db');
		mysql_query('SET NAMES utf8;');
	}
	
	public static function getQuery($query){
		$res = mysql_query($query) or die(mysql_error());
		$row = mysql_fetch_row($res);
		$var = $row[0];
		return $var;
	}
	
	public static function setQuery($query){
		$res = mysql_query($query) or die(mysql_error());
		return $res;
	}
	
	//Getting messages from and to
	public static function getMsgArray($firstMsgId, $lastMsgId){
		$msg = array();
		
		if($firstMsgId<$lastMsgId){
			$query = "SELECT * FROM `chat` WHERE `id`>".$firstMsgId." AND `id`<=".$lastMsgId." ORDER BY `id` ";
			$res = mysql_query($query) or die(mysql_error());
			
			while($row = mysql_fetch_array($res)){
				$msg[] = array("id"=>$row['id'], "name"=>$row['name'], "msg"=>$row['msg']);
			}
		}
		return $msg;
	}
	
	public static function countAllMsg(){
		return static::getQuery("SELECT COUNT(`id`) FROM `chat`;");
	}
	
	public static function getMaxId(){
		$m = static::getQuery("SELECT MAX(id) FROM `chat` WHERE 1");
		return $m;
	}
}

class Chat{
	//How many messages to send to user
	var $max_msg = 60;
	
	public function sendMsgs(){
		
		$maxId = DB::getMaxId();
		//Last message ID 
		$currentMsgId = $_GET['id'];
		//How many messages are missing from the client
		if($currentMsgId == 0){$currentMsgId = $maxId - $this->max_msg;}
		//If the user dosn't have all the messages, we send the missing ones
		$msgs = DB::getMsgArray($currentMsgId, $maxId);
		
		echo json_encode($msgs);
	}
	
	public function saveClientMsg(){
		
		$name = mysql_real_escape_string(htmlspecialchars($_GET['name']));
		$msg = mysql_real_escape_string(htmlspecialchars($_GET['msg']));
		// Saving message to the Data Base
		DB::setQuery("INSERT INTO `chat` (`name` ,`msg` )VALUES ('". $name ."', '". $msg ."');");
	}
	
	public function ifRequested(){
		if($_GET["event"]=="get") 
			$this->sendMsgs();
		
		if($_GET["event"]=="set") 
			$this->saveClientMsg();
	}
}	

$db = new DB;
$db::init();

$chat = new Chat;
$chat->ifRequested();

?>
