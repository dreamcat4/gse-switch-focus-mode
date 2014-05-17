# Switch Focus Type gnome-shell extension 

By Romano Giannetti <romano@rgtti.com> , <romano.giannetti@gmail.com>

Icons based on LockKeys extension by Kazimieras Vaina et al. at https://extensions.gnome.org/extension/36/lock-keys/

### Rationale

This extension is oriented to user that likes to have their focus 
mode set to "sloppy" (an enhanced focus-follow-mouse mode, FFM), but sometime 
they need to switch to the click-to-focus (CTF) mode because some program
misbehave: for example, a lot of programs running under wine will fail 
to correctly show menus when in Focus Follow Mouse (the menu disappears shortly 
after popping up because the window which is the menu is unable to get focus). 
Moreover, the extensions allows to change the auto-raise behavior of focused 
windows, enabling or disabling it. 

### Features

Click on the icon with an F or a C to change from FFM (_F_ icon) to CTF (_C_ icon). 
Click on the icon with an R to change from autoraise enabled (_R_ icon) 
to autoraise diabled  (_R_ icon with a red slash on it). 

Each click toggle the status.

Works on gnome-shell 3.10, but probably also in other version. 
Just try to add the version to `metadata.json` and tell me if it works for you.

![Screencast](https://raw.githubusercontent.com/Rmano/gse-switch-focus-mode/master/screencast2.gif)

### Install 

Just copy/link the directory `SwitchFocusType@romano.rgtti.com` to your 
`~/.local/share/gnome-shell/extensions/`, restart the shell, enable it with 
`gnome-tweak-tool` or equivalent. 

Normally switch between "sloppy" and "click" to focus modes. If you prefer 
"mouse" mode, edit the file `extensions.js` and change the line 

    const FFM_VARIANT='sloppy';

to

    const FFM_VARIANT='mouse';

To change other options (like for example auto-raise delay and similar)
open `dconf-editor`  (install it if you need to) and navigate to the schema 
`org.gnome.desktop.wm.preferences` --- you will find all the other 
options there; this extension will touch only the `focus-mode` and 
`auto-raise` key and leave alone all the others parameters.

### Known issues

* Should be configurable to choose between "sloppy" and "mouse" mode, 
if I could only find how to do it :-) 
* The icon will not be highlighted on mouse-over (?)

