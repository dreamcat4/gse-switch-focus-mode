// SwitchFocusMode extension (c) 2014 Romano Giannetti <romano.giannetti@gmail.com>
// License: GPLv2+, see http://www.gnu.org/licenses/gpl-2.0.txt
//
// Configuration: choose the kind of FFM you like, be "sloppy" or "mouse"
const FFM_VARIANT='sloppy';

// End configuration 
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Gtk = imports.gi.Gtk;
const Gdk = imports.gi.Gdk;
const ExtensionUtils = imports.misc.extensionUtils;
const Meta = ExtensionUtils.getCurrentExtension();
const Util = imports.misc.util;
const Gio = imports.gi.Gio;

let text, button_r, icon_f, icon_c, wm_prefs;
let icon_r, icon_nr, button_f;

var focus;
const FFM=0;
const CTF=1;

var autoraise;

function _set_FFM() {
	focus = FFM;
	button_f.set_child(icon_f);
	wm_prefs.set_string('focus-mode', FFM_VARIANT);
}

function _set_CTF() {
	focus = CTF;
	button_f.set_child(icon_c);
	wm_prefs.set_string('focus-mode', 'click');
}

function _set_AUTORAISE() {
	autoraise = true;
	button_r.set_child(icon_r);
	wm_prefs.set_boolean('auto-raise', true);
}

function _set_NORAISE() {
	autoraise = false;
	button_r.set_child(icon_nr);
	wm_prefs.set_boolean('auto-raise', false);
}


function _hideMsg() {
	if (text) {
		Main.uiGroup.remove_actor(text);
		text = null;
	}
}

function _showMsg(what) {
	if (!text) {
		text = new St.Label({ style_class: 'msg-label', text: what });
		Main.uiGroup.add_actor(text);
	}

	text.opacity = 255;
	let monitor = Main.layoutManager.primaryMonitor;
	text.set_position(Math.floor(monitor.width / 2 - text.width / 2),
			Math.floor(monitor.height / 2 - text.height / 2));
	Tweener.addTween(text,
			{ opacity: 0,
				time: 3,
		transition: 'easeOutQuad',
		onComplete: _hideMsg });
}

function _switch_f() {
	_hideMsg();
	if (focus == FFM) {
		_showMsg("Setting Click-to-focus");
		_set_CTF();
	} else {
		_showMsg("Setting Focus-follow-mouse");
		_set_FFM();
	}
}

function _switch_r() {
	_hideMsg();
	if (autoraise) {
		_showMsg("Disabling autoraise");
		_set_NORAISE();
	} else {
		_showMsg("Enabling autoraise");
		_set_AUTORAISE();
	}
}


function init() {
	button_f = new St.Bin({ style_class: 'panel-button',
		reactive: true,
	       	can_focus: true,
	       	x_fill: true,
	      	y_fill: false,
	        track_hover: true });
	button_r = new St.Bin({ style_class: 'panel-button',
		reactive: true,
	       	can_focus: true,
	       	x_fill: true,
	      	y_fill: false,
	        track_hover: true });
	Gtk.IconTheme.get_default().append_search_path(Meta.dir.get_child('icons').get_path());
	icon_f = new St.Icon({ icon_name: 'fmode',
		style_class: 'system-status-icon' });
	icon_c = new St.Icon({ icon_name: 'cmode',
		style_class: 'system-status-icon' });
	icon_r = new St.Icon({ icon_name: 'rmode',
		style_class: 'system-status-icon' });
	icon_nr = new St.Icon({ icon_name: 'nrmode',
		style_class: 'system-status-icon' });
	wm_prefs=new Gio.Settings({schema: 'org.gnome.desktop.wm.preferences'});
}

function enable() {
	// start with the current mode --- sync icon and internal state.
	var what;
	what=wm_prefs.get_string('focus-mode');
	if (what == 'click') {
		_set_CTF();
	} else { // sloppy or mouse
		_set_FFM();
	}
	what=wm_prefs.get_boolean('auto-raise');
	if (what) {
		_set_AUTORAISE();
	} else { 
		_set_NORAISE();
	}
	button_f.connect('button-press-event', _switch_f);
	button_r.connect('button-press-event', _switch_r);
	Main.panel._rightBox.insert_child_at_index(button_f, 0);
	Main.panel._rightBox.insert_child_at_index(button_r, 0);
}

function disable() {
	Main.panel._rightBox.remove_child(button_r);
	Main.panel._rightBox.remove_child(button_f);
}
