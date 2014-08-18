var $ = document.querySelector.bind(document),
    $all = document.querySelectorAll.bind(document)
    nav = $(".navigation"),
    menu = $(".menu-button"),
    homeButton = $(".home-button"),
    pages = {
  main: $('[data-page="main"]'),
  about: $('[data-page="about"]'),
  skills: $('[data-page="skills"]'),
  works: $('[data-page="works"]'),
  contact: $('[data-page="contact"]')
};

var current = $(".page.current");
var previous = current;

var pagelist=[];
for(var name in pages){
  pages[name].setAttribute("data-index",pagelist.length);
  pagelist.push(pages[name]);
}

function activateNav(ev){
  ev.stopPropagation();
  nav.classList.add("active");
};

function deactivateNav(){
  nav.classList.remove("active");
};

function toogleNav(ev){
  ev.stopPropagation();
  nav.classList.toggle("active");
};


function setpage(page) {
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
};

function gotoNextPage(){
  var index = parseInt(current.getAttribute("data-index")) || 0;
  if(index < pagelist.length - 1){
    location.hash = pagelist[index+1].getAttribute("data-page");
  }
};

function gotoPreviousPage(){
  var index = parseInt(current.getAttribute("data-index")) || 0;
  if(index > 0){
    location.hash = pagelist[index-1].getAttribute("data-page");
  }
};

function setPageOnHashValue() {
  "use strict";
  var elem, hashval = location.hash.substr(1);
  if (pages[hashval]) {
    setpage(pages[hashval]); 
  } else {
    setpage(pages.main); 
  }
};

if(isMobile.phone){
  document.body.classList.add("phone", "mobile", "no-desktop", "no-tablet");
} else if(isMobile.tablet){
  document.body.classList.add("no-phone", "mobile", "no-desktop", "tablet");
} else {
  document.body.classList.add("no-phone", "no-mobile", "desktop", "no-tablet");
}

homeButton.addEventListener("click", function(ev){
  ev.preventDefault();
  window.history.pushState('object', "Omar Castro", ev.target.href);
  window.onhashchange();
});

document.addEventListener("click",deactivateNav);
nav.addEventListener("mouseover",activateNav);
menu.addEventListener("click",toogleNav);
nav.addEventListener("click",activateNav);
nav.addEventListener("mouseleave",deactivateNav);

document.onkeydown = function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == 37 /*left arrow*/) { gotoPreviousPage(); }
    else if (e.keyCode == 39 /*right arrow*/) { gotoNextPage(); }
};

window.onhashchange = setPageOnHashValue
setPageOnHashValue();

var mc = new Hammer.Manager(document.body, {});
mc.add(new Hammer.Swipe({direction: Hammer.DIRECTION_HORIZONTAL, velocity:0.3}));
mc.on('swipeleft', gotoNextPage);
mc.on('swiperight', gotoPreviousPage);