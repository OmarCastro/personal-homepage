//isMobile.js
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
f=/Android/i,g=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,i=/BlackBerry/i,j=/Opera Mini/i,
k=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,l=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),
m=function(a,b){return a.test(b)},n=function(a){var n=a||navigator.userAgent;
this.apple={phone:m(b,n),ipod:m(c,n),tablet:m(d,n),device:m(b,n)||m(c,n)||m(d,n)},
this.android={phone:m(e,n),tablet:!m(e,n)&&m(f,n),device:m(e,n)||m(f,n)},
this.windows={phone:m(g,n),tablet:m(h,n),device:m(g,n)||m(h,n)},this.other={blackberry:m(i,n),
opera:m(j,n),firefox:m(k,n),device:m(i,n)||m(j,n)||m(k,n)},this.seven_inch=m(l,n),
this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,
this.phone=this.apple.phone||this.android.phone||this.windows.phone,
this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet},o=new n;
o.Class=n,"undefined"!=typeof module&&module.exports?module.exports=o:"function"==typeof define
&&define.amd?define(o):a.isMobile=o}(this);

var $ = document.querySelector.bind(document),
    $all = document.querySelectorAll.bind(document),
    nav = $(".navigation"),
    pages = ["","about","skills","works","contact"],
    navHtml = nav.outerHTML,
    pageInfo = [];
Element.prototype.on = function on(s, fn, val) {
  var evts = s.split(' ');
  for (var i=0, iLen=evts.length; i<iLen; i++) {
    this.addEventListener(evts[i], fn, val);
  }
}

NodeList.prototype.on = function(event, fn, val){
  for (var i = 0, len = this.length; i < len; i++) {
    this[i].on(event, fn, val);
  }
}


if(isMobile.phone){
  document.body.classList.add("phone", "mobile", "no-desktop", "no-tablet");
} else if(isMobile.tablet){
  document.body.classList.add("no-phone", "mobile", "no-desktop", "tablet");
} else {
  document.body.classList.add("no-phone", "no-mobile", "desktop", "no-tablet");
}

pages.forEach(function(val){
  var request = new XMLHttpRequest();
  request.open("GET", "./"+val, false);
  request.send(null);
  var doc = document.implementation.createHTMLDocument("example");
  doc.documentElement.innerHTML = request.responseText;
  pageInfo.push({
    html: request.responseText,
    pageHTML: doc.documentElement.querySelector(".page.current").outerHTML,
    title: doc.documentElement.querySelector("title").innerHTML,
    link: val
  });
});

function toPagelink(link){
  var href = link.getAttribute("data-to");
  var info = pageInfo[pages.indexOf(href)];
  gotoPage(info)
  if(link.href != location.href){
    var win = window;
    win.history.pushState({"info":info}, info.title , link.href);
    win.scroll(0,0);
  }
}

function gotoPage(pageinfo){

  document.title = pageinfo.title;
  $(".page.current").outerHTML = pageinfo.pageHTML
  $(".pagelink.active").classList.remove("active");
  $(".topbar-button.pagelink[data-to=\""+pageinfo.link+"\"]").classList.add("active");
  ga('send', 'pageview', {
    'page': '/' + pageinfo.link,
    'title': pageinfo.title
  });
  nav.classList.add("hide");
  $(".content").focus();
}

nav.on("mouseover touchstart",function(ev){nav.classList.remove("hide")})

function gotoNextPage(){
  var index = parseInt($(".pagelink.active").getAttribute("data-pageindex"));
  if(index < pages.length - 1){ toPagelink($(".pagelink[data-pageindex=\"" +(index + 1)+ "\"]")); }
}

function gotoPreviousPage(){
  var index = parseInt($(".pagelink.active").getAttribute("data-pageindex"));
  if(index > 0){ toPagelink($(".pagelink[data-pageindex=\"" +(index - 1)+ "\"]")); }
}

function pagelinkClick(ev){
  ev.stopPropagation();
  ev.preventDefault();
  ev = ev || window.event;
  var target = ev.target || ev.srcElement
  if (target.nodeType == 3){ // defeat Safari bug
    target = target.parentNode;
  }
  toPagelink(target)
}

$all(".pagelink").on("click", pagelinkClick);


window.onpopstate = function(event){ gotoPage(event.state.info); }
$(".content").focus();

document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) { // 37: left, 38: up, 39: right, 40: down
        case 37: // left
          gotoPreviousPage();
        break;
        case 39: // right
          gotoNextPage();
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)

};