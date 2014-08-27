//classlist polyfill
;if("document" in self&&!("classList" in document.createElement("_")))
{(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",
m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},
c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q)
{return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},
g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}
if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}
return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],
p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",
this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o)
{return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function()
{var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}
while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,
o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o)
{this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&
"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};
if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}
catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__)
{m.__defineGetter__(a,i)}}}(self))};

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
    pages = [".","about","skills","works","contact"],
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
  var href = link.getAttribute("href");
  var info = pageInfo[pages.indexOf(href)];
  gotoPage(info)
  if(link.href != location.href){
    var win = window;
    win.history.pushState({"info":info}, info.title , link.href);
    win.scrollTo(0,1);
  }
}

function gotoPage(pageinfo){
  document.title = pageinfo.title;
  $(".page.current").outerHTML = pageinfo.pageHTML
  $(".pagelink.active").classList.remove("active");
  $(".topbar-button.pagelink[href=\""+pageinfo.link+"\"]").classList.add("active");
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


function eventTarget(ev){
  ev = ev || window.event;
  var target = ev.target || ev.srcElement
  return (target.nodeType == 3) ? target.parentNode : target
}

document.body.on("click", function(ev){
  var target = eventTarget(ev);
  if(target.classList.contains("pagelink")){
    ev.preventDefault();
    toPagelink(target);
  }
});

window.onpopstate = function(event){ gotoPage(event.state.info); }

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