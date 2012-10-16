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
				console.log('setMenuState();');
			},

			getMenuState: function() {
				console.log('getMenuState();');
			},

			setMenuStyle: function(styles) {
				console.log('setMenuStyle();');
			},

			setPanelStyle: function(styles) {
				console.log('setPanelStyle();');
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

			init: function() {
				console.log('init();');
			},

			destroy: function() {
				console.log('destroy();');
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