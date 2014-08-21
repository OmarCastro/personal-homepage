var $ = document.querySelector.bind(document),
    $all = document.querySelectorAll.bind(document),
    pages = ["","about","skills","works","contact"],
    pageInfo = [];
Element.prototype.on = Element.prototype.addEventListener;
NodeList.prototype.on = function(event, fn, val){
  for (var i = 0, len = this.length; i < len; i++) {
    this[i].addEventListener(event, fn, val);
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
  if(link.href == location.href){ return; }
  var href = link.getAttribute("data-to");
  var info = pageInfo[pages.indexOf(href)];
  gotoPage(info)
  window.history.pushState({"info":info}, info.title , link.href);
}

function gotoPage(pageinfo){
  document.title = pageinfo.title;
  $(".page.current").outerHTML = pageinfo.pageHTML
  $(".pagelink.active").classList.remove("active");
  $(".topbar-button.pagelink[data-to=\""+pageinfo.link+"\"]").classList.add("active");
}

function gotoNextPage(){
  var index = parseInt($(".pagelink.active").getAttribute("data-pageindex"));
  if(index < pages.length - 1){ toPagelink($(".pagelink[data-pageindex=\"" +(index + 1)+ "\"]")); }
}

function gotoPreviousPage(){
  var index = parseInt($(".pagelink.active").getAttribute("data-pageindex"));
  if(index >= 0){ toPagelink($(".pagelink[data-pageindex=\"" +(index - 1)+ "\"]")); }
}

$all(".pagelink").on("click", function(ev){
  ev.stopPropagation();
  ev.preventDefault();
  ev = ev || window.event;
  var target = ev.target || ev.srcElement
  if (target.nodeType == 3){ // defeat Safari bug
    target = target.parentNode;
  }
  toPagelink(target)
})

window.onpopstate = function(event){ gotoPage(event.state.info); }


var mc = new Hammer(document.body);
mc.on('swipeleft', gotoNextPage);
mc.on('swiperight', gotoPreviousPage);