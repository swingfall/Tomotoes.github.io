function _toConsumableArray(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}!function(e){"undefined"==typeof module?this.charming=e:module.exports=e}(function(e,n){"use strict";var t=(n=n||{}).tagName||"span",a=null!=n.classPrefix?n.classPrefix:"char",r=1;return function e(n){for(var i=[].slice.call(n.childNodes),o=i.length,u=-1;++u<o;)e(i[u]);n.nodeType===Node.TEXT_NODE&&function(e){for(var n=e.parentNode,i=e.nodeValue,o=i.length,u=-1;++u<o;){var s=document.createElement(t);a&&(s.className=a+r,r++),s.appendChild(document.createTextNode(i[u])),n.insertBefore(s,e)}n.removeChild(e)}(n)}(e),e});var DOM={};DOM.intro=document.querySelector(".content--intro"),DOM.shape=DOM.intro.querySelector("svg.shape"),DOM.path=DOM.shape.querySelector("path"),DOM.enter=document.querySelector(".enter"),charming(DOM.enter),DOM.enterLetters=Array.from(DOM.enter.querySelectorAll("span")),DOM.shape.style.transformOrigin="50% 0%";var init=function(){DOM.enter.addEventListener("click",navigate),DOM.enter.addEventListener("touchenter",navigate),DOM.enter.addEventListener("mouseenter",enterHoverInFn),DOM.enter.addEventListener("mouseleave",enterHoverOutFn)},loaded=void 0,navigate=function(){loaded||(loaded=!0,anime({targets:DOM.intro,duration:1100,easing:"easeInOutSine",translateY:"-200vh"}),anime({targets:DOM.shape,scaleY:[{value:[.8,1.8],duration:550,easing:"easeInQuad"},{value:1,duration:550,easing:"easeOutQuad"}]}),anime({targets:DOM.path,duration:1100,easing:"easeOutQuad",d:DOM.path.getAttribute("pathdata:id")}))},isActive=void 0,enterTimeout=void 0,enterHoverInFn=function(){return enterTimeout=setTimeout(function(){isActive=!0,anime.remove(DOM.enterLetters),anime({targets:DOM.enterLetters,delay:function(e,n){return 15*n},translateY:[{value:10,duration:150,easing:"easeInQuad"},{value:[-10,0],duration:150,easing:"easeOutQuad"}],opacity:[{value:0,duration:150,easing:"linear"},{value:1,duration:150,easing:"linear"}],color:{value:"#ff963b",duration:1,delay:function(e,n,t){return 15*n+150}}})},50)},enterHoverOutFn=function(){clearTimeout(enterTimeout),isActive&&(isActive=!1,anime.remove(DOM.enterLetters),anime({targets:DOM.enterLetters,delay:function(e,n,t){return 15*(t-n-1)},translateY:[{value:10,duration:150,easing:"easeInQuad"},{value:[-10,0],duration:150,easing:"easeOutQuad"}],opacity:[{value:0,duration:150,easing:"linear"},{value:1,duration:150,easing:"linear"}],color:{value:"#ffffff",duration:1,delay:function(e,n,t){return 15*(t-n-1)+150}}}))};init();var ifades=[].concat(_toConsumableArray(document.querySelector(".content__inner").querySelectorAll(".fade")));window.addEventListener("DOMContentLoaded",function(){ifades.forEach(function(e){return e.classList.add("in")})}),window.addEventListener("beforeunload",function(){ifades.forEach(function(e){return e.classList.remove("in")})}),setTimeout(function(){return $(".content__subtitle").html("<span>"+[].concat(_toConsumableArray("Web Front-End Developer")).join("</span><span>")+"</span>")},300);