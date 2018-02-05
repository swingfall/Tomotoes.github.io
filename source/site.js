let hColor; 
const header = $("#card header");
function getDayLight() {
	let time = new Date();
	let hour = time.getHours() - 12;
	let factor = hour ? Math.abs(hour) / hour : 1;
	hour = hour + (time.getMinutes() * 60 + time.getSeconds()) / 3600;

	let n = (hour / 4 - factor) * factor;
	n = Math.max(n, 0);
	n = Math.min(1, n);

	return n;
}

function setLightColor() {
	$("#page").css("background-color", `rgba(85,85,85,${ getDayLight() })`);
	textColorBase = 0x4d;
	textColorDelta = 0x80;
  textColor = Math.round(textColorBase + textColorDelta * getDayLight());
  hColor = `rgb(${ textColor }, ${ textColor }, ${ textColor })`;
	header.css("color", hColor);
}

let fileConut = 0;
const fileMax = 8;

function getHitokoto() {
	if (localStorage.getItem("motto")) {
		return;
	}
	try {
		$.ajax({
			type: "GET",
			url: "https://sslapi.hitokoto.cn/",
			dataType: "json",
			timeout: 2500,
			success: function (data) {
				if (data.hitokoto.length > 12) {
					fileConut++;
					if (fileConut > fileMax) {
						localStorage.setItem("motto", "为了正义！");
					} else {
						getHitokoto();
					}
				} else {
					localStorage.setItem("motto", data.hitokoto);
				}
			},
			error: function () {
				localStorage.setItem("motto", "生活不止眼前的苟且");
			}
		});
	} catch (e) {
		localStorage.setItem("motto", "生活不止眼前的苟且");
	}

}

function preLoad() {
	const _iframe = document.createElement("iframe");
	_iframe.style.display = "none";
	_iframe.setAttribute("src", "https://tomotoes.com/blog");
	document.body.appendChild(_iframe);

	const I = new Image();
	I.src = `https://tomotoes.com/images/live2d/${ Number(localStorage.getItem("model")) }.png`;
	I.style.display = "none";
	document.body.appendChild(I);

}
const title = document.getElementById("typetitle");
const typingbefore = "你好，我叫 Simon，来自北方。";//获取标题内容
let _i = 0;
let countCall = 0;
function typetitle(){
		if(_i <= typingbefore.length){
			title.innerHTML = `${typingbefore.slice(0,_i++)}|`;//将标题内容通过slice()方法返回
			
			setTimeout(typetitle,180);//每100毫秒执行一次
		}else{
			title.innerHTML = typingbefore;//当标题内容全部返回后，去掉最后的‘|’
		}
}

window.onload = function () {

	setLightColor();
  setInterval(setLightColor, 60000);
  
	preLoad();

  getHitokoto();
  
	messenger($("#typetitle"));
};

function messenger (el){
  
  let m = this;
  
  m.init = function(){
    m.codeletters = "&#*+%?￡@§$";
    m.message = 0;
    m.current_length = 0;
    m.fadeBuffer = false;
    m.messages = [
      "..."
    ];
    
    setTimeout(m.animateIn, 100);
  };
  
  m.generateRandomString = function(length){
    let random_text = "";
    while(random_text.length < length){
      random_text += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
    } 
    
    return random_text;
  };
  
  m.animateIn = function(){
    if(m.current_length < m.messages[m.message].length){
      m.current_length = m.current_length + 2;
      if(m.current_length > m.messages[m.message].length) {
        m.current_length = m.messages[m.message].length;
      }
      
      let message = m.generateRandomString(m.current_length);
      $(el).html(message);
      
      setTimeout(m.animateIn, 20);
    } else { 
      setTimeout(m.animateFadeBuffer, 20);
    }
  };
  
  m.animateFadeBuffer = function(){
    if(m.fadeBuffer === false){
      m.fadeBuffer = [];
      for(var i = 0; i < m.messages[m.message].length; i++){
        m.fadeBuffer.push({c: Math.floor(Math.random() * 12) + 1, l: m.messages[m.message].charAt(i)});
      }
    }
    
    let do_cycles = false;
    let message = ""; 
    
    for(var i = 0; i < m.fadeBuffer.length; i++){
      let fader = m.fadeBuffer[i];
      if(fader.c > 0){
        do_cycles = true;
        fader.c--;
        message += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
      } else {
        message += fader.l;
      }
    }
    
    $(el).html(message);
    
    if(do_cycles === true){
      setTimeout(m.animateFadeBuffer, 50);
    } else {
      if(++countCall===2){
        typetitle();
      }else{
        m.cycleText();
      }
    }
  };
  m.cycleText = function(){
    m.message = m.message + 1;
    if(m.message >= m.messages.length){
      m.message = 0;
    }
    
    m.current_length = 0;
    m.fadeBuffer = false;
    $(el).html("");
    
    setTimeout(m.animateIn, 200);
  };
  
  m.init();
};