!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,i=/BlackBerry/i,j=/Opera Mini/i,k=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,l=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),m=function(a,b){return a.test(b)},n=function(a){var n=a||navigator.userAgent;this.apple={phone:m(b,n),ipod:m(c,n),tablet:m(d,n),device:m(b,n)||m(c,n)||m(d,n)},this.android={phone:m(e,n),tablet:!m(e,n)&&m(f,n),device:m(e,n)||m(f,n)},this.windows={phone:m(g,n),tablet:m(h,n),device:m(g,n)||m(h,n)},this.other={blackberry:m(i,n),opera:m(j,n),firefox:m(k,n),device:m(i,n)||m(j,n)||m(k,n)},this.seven_inch=m(l,n),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet},o=new n;o.Class=n,"undefined"!=typeof module&&module.exports?module.exports=o:"function"==typeof define&&define.amd?define(o):a.isMobile=o}(this);

if(isMobile.phone){
  document.body.classList.add("phone", "mobile", "no-desktop", "no-tablet");
} else if(isMobile.tablet){
  document.body.classList.add("no-phone", "mobile", "no-desktop", "tablet");
} else {
  document.body.classList.add("no-phone", "no-mobile", "desktop", "no-tablet");
}