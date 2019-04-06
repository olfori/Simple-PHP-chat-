'use strict';

class Chat {
	
  constructor() {
    this.user_name = 'Oleg';
	this.last_msg_id = 0;
	this.request_interval = 2000;
  }
  
  run(){
	this.setUserName();
	this.setAjax();
	this.refreshChat();
	this.setRequestInterval();
	this.ifFormSubmit();
  }
  
  setUserName(){
	$('.name').val(this.user_name);
  }
  
  setAjax(){
	$.ajaxSetup({url: "chat.php", global: true, type: "GET"});
  }
  
  refreshChat(){
	var _this = this;
    $.ajax({
	  data: "event=get&id="+this.last_msg_id,
      success: function(recieved_msg){
        //If there are messages in the received data
        if(recieved_msg.length > 2){
          var obj = JSON.parse(recieved_msg);
          //Run the cycle through all accepted messages
          for(var i=0; i < obj.length; i ++){
            _this.last_msg_id = obj[i].id;
            //Adding a chat message
            $("#msg-box ul").append("<li><b>"+ obj[i].name + "</b>: " +obj[i].msg + "</li>");
          }
          //Scroll the chat to the very end
          $("#msg-box").scrollTop(2000);
        }
      }
    });
  }
  
  setRequestInterval(){
	setInterval(() => {
       this.refreshChat();
    }, this.request_interval);
  }
  
  sendMsg(){
	var my_msg = $(".msg").val();
	var my_nm = $(".name").val();
	//If the message is not empty
	if( my_msg != "" ){
		//Cleaning the form
		$('.msg').val('');
		//Send a request
		$.ajax({data: "event=set&name="+my_nm+"&msg="+my_msg});
	}
	//I return false to prevent the form from being sent
	return false;
  }
  
  ifFormSubmit(){
	$("#t-box").submit(this.sendMsg);
  }
}

let chat = new Chat();

chat.run();
