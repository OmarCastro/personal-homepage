window.mobilecheck = function() {
var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
return check; }

var ismobile = mobilecheck()
document.body.classList.add(ismobile? "mobile": "desktop");
  function hideAddressBar(){
    if(document.documentElement.scrollHeight<window.outerHeight/window.devicePixelRatio)
      document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
    setTimeout(window.scrollTo(1,1),0);
  }
if(ismobile){
  window.addEventListener("load",function(){setTimeout(hideAddressBar,200);});
  window.addEventListener("orientationchange",function(){hideAddressBar();});
}


document.querySelector(".home-button").addEventListener("click", function(ev){
  ev.preventDefault();
  window.history.pushState('object', "Omar Castro", ev.target.href);
  window.onhashchange();
})


var nav = document.querySelector(".navigation");
var menu = document.querySelector(".button.menu");

var navtoActive = function(ev){
  ev.stopPropagation();
  nav.classList.add("active");
};

var deactivateNav = function(){
  nav.classList.remove("active");
}

var toogleNav = function(ev){
  ev.stopPropagation();
  nav.classList.toggle("active");
}

document.addEventListener("click",deactivateNav);
nav.addEventListener("mouseover",navtoActive);
menu.addEventListener("click",toogleNav);
nav.addEventListener("click",navtoActive);
nav.addEventListener("mouseleave",deactivateNav);



var pages = {
  main: document.querySelector('[data-page="main"]'),
  about: document.querySelector('[data-page="about"]'),
  skills: document.querySelector('[data-page="skills"]'),
  works: document.querySelector('[data-page="works"]'),
  contact: document.querySelector('[data-page="contact"]')
};

var pagelist = [];

(function(){ 
  for(var name in pages){
    pages[name].setAttribute("data-index",pagelist.length);
    pagelist.push(pages[name]);
  }
})()

window.pages = pages;
var current = pages.main;
var previous = pages.main;
current.classList.add("current");
var myElement = document.querySelector('.main.content');


var setpage = function (page) {
    document.body.setAttribute("data-onpage",page.getAttribute("data-page"));
    if(current == page){
      return; 
    }
    var classList = current.classList;
    nav.classList.remove("active");

    previous.classList.remove("previous");
    classList.add("previous");
    classList.add("out-of-current");
    classList.remove("current");
    setTimeout(function(){
      classList.remove("out-of-current");
    },700);
    page.classList.add("current");
    previous = current;
    current = page;
    page.scrollTop = 0;
    if(ismobile){
      hideAddressBar();
    }
  };


var mc = new Hammer(document.body, {
 swipeVelocityX: 0.4,
});

var gotoNextPage = function(){
  var index = parseInt(current.getAttribute("data-index")) || 0;
  if(index < pagelist.length - 1){
    location.hash = pagelist[index+1].getAttribute("data-page")
  }
}

var gotoPreviousPage = function(){
  var index = parseInt(current.getAttribute("data-index")) || 0;
  if(index > 0){
    location.hash = pagelist[index-1].getAttribute("data-page")
  }
}



mc.on('swipeleft', gotoNextPage);
mc.on('swiperight', gotoPreviousPage);

document.onkeydown = function checkKey(e) {

    e = e || window.event;

	// left arrow
    if (e.keyCode == 37) { gotoPreviousPage() }
    // right arrow
    else if (e.keyCode == 39) { gotoNextPage() }
}

mc.on("drag swipe", function(ev) {
   // only horizontal swipe
   if(Hammer.utils.isVertical(ev.gesture.direction)) {
      return;
   }
   // prevent scrolling, so the drag/swipe handler is getting called
   ev.gesture.preventDefault();
});


 window.onhashchange = function () {
  "use strict";
  var elem, hashval = location.hash.substr(1);
  if (pages[hashval]) {
    setpage(pages[hashval]); 
  } else {
    setpage(pages.main); 
  }
};


window.onhashchange();