#!/bin/bash
#
# L Nix <lornix@lornix.com>
# reload browser window
#
# whether to use SHIFT+CTRL+R to force reload without cache
mydir=${0:a:h}

RELOAD_KEYS="CTRL+R"
#RELOAD_KEYS="SHIFT+CTRL+R"
#
# set to whatever's given as argument
BROWSER=$1
#
# if was empty, default set to name of browser, firefox/chrome/opera/etc..
if [ -z "${BROWSER}" ]; then
    BROWSER=Firefox
fi


function reload(){
    MYID="$(xdotool getwindowfocus)"
    FOCUS="$(i3-msg '[class="'$BROWSER'"] focus')"
    if [ $FOCUS = '[{"success":true}]' ]; then
        xdotool key --clearmodifiers F5;
        i3-msg '[id="'$MYID'"] focus';
    fi
}

 inotifywait -r -m -e CLOSE_WRITE index.html *.css | while read ln; do reload; done

# send the page-reload keys (C-R) or (S-C-R)


#
