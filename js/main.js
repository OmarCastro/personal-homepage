const $ = document.querySelector.bind(document)
const $all = document.querySelectorAll.bind(document)

const currentPage = () => $(".page:target") || $('.page--main')

function navigateToMainPage(){
  location.hash = ""
  history.replaceState('', document.title, window.location.pathname)
}

const pagelist = [$('.page--main'), ...$all('.page:target:not(.page--main)')]

function gotoNextPage(){
  const index = pagelist.indexOf(currentPage());
  if(index >= pagelist.length - 1){ return }
  const newId = pagelist[index+1].getAttribute("id")
  newId == null ? navigateToMainPage() : location.hash = newId;
}

function gotoPreviousPage(){
  const index = pagelist.indexOf(currentPage());
  if(index <= 0){ return }
  const newId = pagelist[index-1].getAttribute("id")
  newId == null ? navigateToMainPage() : location.hash = newId;
}

document.addEventListener('keydown', ({key}) => {
  switch(key){
    case "ArrowLeft": gotoPreviousPage(); break
    case "ArrowRight": gotoNextPage(); break
  }
});
    
function checkDirection(touchstartX, touchendX) {
  if (touchendX < touchstartX) { gotoNextPage() }
  if (touchendX > touchstartX) { gotoPreviousPage() }
}

document.addEventListener('touchstart', e => {
  const touchstartX = e.changedTouches[0].screenX
  let touchState = "startSwipe"
  document.addEventListener('scroll', () => {touchState = "scrolling"}, {once: true, capture: true})
  document.addEventListener('touchend', e => {
    const touchendX = e.changedTouches[0].screenX
    if(touchState === "startSwipe"){ checkDirection(touchstartX, touchendX) }
  }, {once: true})
})

// prevents page refresh
document.addEventListener('click', e => {
  if(e.target.closest('.home-button')){
    e.preventDefault()
    navigateToMainPage()
  }
})
