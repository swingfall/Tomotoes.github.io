function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var hColor=void 0,header=$("#card header");function getDayLight(){var e=new Date,t=e.getHours()-12,n=t?Math.abs(t)/t:1,r=((t+=(60*e.getMinutes()+e.getSeconds())/3600)/4-n)*n;return r=Math.max(r,0),r=Math.min(1,r)}function setLightColor(){$("#page").css("background-color","rgba(85,85,85,"+getDayLight()+")"),(new Date).getHours()<17&&(title.style="color:#666")}function preLoad(){var e=document.createElement("iframe");e.style.display="none",e.setAttribute("src","//tomotoes.com/blog"),document.body.appendChild(e);var t=new Image;t.src="//tomotoes.com/images/live2d/"+Number(localStorage.getItem("model"))+".png",t.style.display="none",document.body.appendChild(t)}var title=document.getElementById("typetitle"),typingbefore="你好，我叫 Simon，来自北方。",_i=0,countCall=0;function typetitle(){_i<=typingbefore.length?(title.innerHTML=typingbefore.slice(0,_i++)+"|",setTimeout(typetitle,120)):title.innerHTML=typingbefore}function isPhone(){return/Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(navigator.userAgent)}window.onload=function(){setTimeout(preLoad,1500)};var changeMax=isPhone()?1:2;function messenger(e){var t=this;t.init=function(){t.codeletters="&#*+%?￡@§$",t.message=0,t.current_length=0,t.fadeBuffer=!1,t.messages=["..."],setTimeout(t.animateIn,100)},t.generateRandomString=function(e){for(var n="";n.length<e;)n+=t.codeletters.charAt(Math.floor(Math.random()*t.codeletters.length));return n},t.animateIn=function(){if(t.current_length<t.messages[t.message].length){t.current_length=t.current_length+2,t.current_length>t.messages[t.message].length&&(t.current_length=t.messages[t.message].length);var n=t.generateRandomString(t.current_length);$(e).html(n),setTimeout(t.animateIn,20)}else setTimeout(t.animateFadeBuffer,20)},t.animateFadeBuffer=function(){if(!1===t.fadeBuffer){t.fadeBuffer=[];for(var n=0;n<t.messages[t.message].length;n++)t.fadeBuffer.push({c:Math.floor(12*Math.random())+1,l:t.messages[t.message].charAt(n)})}var r=!1,a="";for(n=0;n<t.fadeBuffer.length;n++){var o=t.fadeBuffer[n];o.c>0?(r=!0,o.c--,a+=t.codeletters.charAt(Math.floor(Math.random()*t.codeletters.length))):a+=o.l}$(e).html(a),!0===r?setTimeout(t.animateFadeBuffer,50):++countCall===changeMax?typetitle():t.cycleText()},t.cycleText=function(){t.message=t.message+1,t.message>=t.messages.length&&(t.message=0),t.current_length=0,t.fadeBuffer=!1,$(e).html(""),setTimeout(t.animateIn,200)},t.init()}var ofades=[].concat(_toConsumableArray(document.querySelector("#card").querySelectorAll(".fade")));function enter(){setTimeout(function(){ofades.forEach(function(e){return e.classList.add("in")})},400),setLightColor(),setInterval(setLightColor,6e4),messenger($("#typetitle"))}