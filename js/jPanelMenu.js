(function($){
	$.jPanelMenu = function(options){
		if ( typeof(options) == "undefined" || options == null ) { options = {}; };
		var jP = {
			options: $.extend({
				trigger: '.menu-trigger',
				menu: '#menu',
				keyboardShortcuts: true,

				openPosition: 75,

				duration: 150,
				openDuration: options.duration || 150,
				closeDuration: options.duration || 150,

				easing: 'swing',
				openEasing: options.easing || 'swing',
				closeEasing: options.easing || 'swing',

				after: function(){ console.log('jP.options.after();'); },
				afterOpen: function(){ console.log('jP.options.afterOpen();'); },
				afterClose: function(){ console.log('jP.options.afterClose();'); }
			},options),

			setMenuState: function(open) {
				var position = (open)?'open':'closed';
				console.log('setMenuState(' + position + ');');
				$('body').attr('data-menu-position', position);
			},

			getMenuState: function() {
				console.log('getMenuState();');
				return $('body').attr('data-menu-position');
			},

			menuIsOpen: function() {
				console.log('menuIsOpen();');
				if ( jP.getMenuState() == 'open' ) return true;
				else return false;
			},

			setMenuStyle: function(styles) {
				console.log('setMenuStyle(' + styles + ');');
			},

			setPanelStyle: function(styles) {
				console.log('setPanelStyle(' + styles + ');');
			},

			openMenu: function() {
				console.log('openMenu();');
				jP.setMenuState(true);
			},

			closeMenu: function() {
				console.log('closeMenu();');
				jP.setMenuState(false);
			},

			triggerMenu: function() {
				console.log('--------------------');
				console.log('triggerMenu();');
				if ( jP.menuIsOpen() ) jP.closeMenu();
				else jP.openMenu();
			},

			initiateClickListeners: function() {
				console.log('initiateClickListeners();');
				$(document).on('click',jP.options.trigger,function(){ jP.triggerMenu(); return false; });
			},

			destroyClickListeners: function() {
				console.log('destroyClickListeners();');
				$(document).off('click',jP.options.trigger,null);
			},

			initiateKeyboardListeners: function() {
				console.log('initiateKeyboardListeners();');
			},

			destroyKeyboardListeners: function() {
				console.log('destroyKeyboardListeners();');
			},

			buildHTML: function() {
				console.log('buildHTML();');
			},

			deconstructHTML: function() {
				console.log('deconstructHTML();');
			},

			init: function() {
				console.log('--------------------');
				console.log('init();');

				jP.initiateClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.initiateKeyboardListeners(); }

				jP.setMenuState(false);
				jP.buildHTML();
			},

			destroy: function() {
				console.log('--------------------');
				console.log('destroy();');
				
				jP.destroyClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.destroyKeyboardListeners(); }

				jP.setMenuState(false);
				jP.deconstructHTML();
			}
		};

		return {
			on: jP.init,
			off: jP.destroy,
			trigger: jP.triggerMenu,
			open: jP.openMenu,
			close: jP.closeMenu
		};
	};
})(jQuery);