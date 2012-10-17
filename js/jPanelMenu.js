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

				after: function(){},
				afterOpen: function(){},
				afterClose: function(){}
			},options),

			setMenuState: function(position) {
				console.log('setMenuState(' + position + ');');
			},

			getMenuState: function() {
				console.log('getMenuState();');
			},

			setMenuStyle: function(styles) {
				console.log('setMenuStyle(' + styles + ');');
			},

			setPanelStyle: function(styles) {
				console.log('setPanelStyle(' + styles + ');');
			},

			openMenu: function() {
				console.log('openMenu();');
			},

			closeMenu: function() {
				console.log('closeMenu();');
			},

			triggerMenu: function() {
				console.log('triggerMenu();');
			},

			initiateClickListeners: function() {
				console.log('initiateClickListeners();');
			},

			destroyClickListeners: function() {
				console.log('destroyClickListeners();');
			},

			initiateKeyboardListeners: function() {
				console.log('initiateKeyboardListeners();');
			},

			destroyKeyboardListeners: function() {
				console.log('destroyKeyboardListeners();');
			},

			init: function() {
				console.log('init();');

				jP.initiateClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.initiateKeyboardListeners(); }

				jP.setMenuState('closed');
			},

			destroy: function() {
				console.log('destroy();');
				
				jP.destroyClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.destroyKeyboardListeners(); }
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