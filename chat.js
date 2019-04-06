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
        //Если есть сообщения в принятых данных
        if(recieved_msg.length > 2){
          //Парсим JSON
          var obj = JSON.parse(recieved_msg);
          //Прогоняем циклом по всем принятым сообщениям
          for(var i=0; i < obj.length; i ++){
            //Присваиваем переменной ID сообщения
            _this.last_msg_id = obj[i].id;
            //Добавляем в чат сообщение
            $("#msg-box ul").append("<li><b>"+ obj[i].name + "</b>: " +obj[i].msg + "</li>");
          }
          //Прокручиваем чат до самого конца
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
	//Если сообщение не пустое
	if( my_msg != "" ){
		//Чищу форму
		$('.msg').val('');
		//Отправляю запрос
		$.ajax({data: "event=set&name="+my_nm+"&msg="+my_msg});
	}
	//Возвращаю false, чтобы форма не отправлялась.
	return false;
  }
  
  ifFormSubmit(){
	$("#t-box").submit(this.sendMsg);
  }
}

let chat = new Chat();

chat.run();
