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
				$('body').attr('data-menu-position', position);
			},

			getMenuState: function() {
				return $('body').attr('data-menu-position');
			},

			menuIsOpen: function() {
				if ( jP.getMenuState() == 'open' ) return true;
				else return false;
			},

			setMenuStyle: function(styles) {
				$('#jPanelMenu-menu').css(styles);
			},

			setPanelStyle: function(styles) {
				$('.jPanelMenu-panel').css(styles);
			},

			openMenu: function() {
				jP.setMenuState(true);
				$('html, body').css({
					overflow: 'hidden'
				});
				jP.setPanelStyle({
					position: 'relative',
					left: jP.options.openPosition + '%'
				});
				jP.setMenuStyle({
					display: 'block'
				});
			},

			closeMenu: function() {
				jP.setMenuState(false);
				$('html, body').css({
					'overflow-x': 'hidden',
					'overflow-y': 'scroll'
				});
				jP.setPanelStyle({
					position: 'static',
					left: 0
				});
				jP.setMenuStyle({
					display: 'none'
				});
			},

			triggerMenu: function() {
				if ( jP.menuIsOpen() ) jP.closeMenu();
				else jP.openMenu();
			},

			initiateClickListeners: function() {
				$(document).on('click',jP.options.trigger,function(){ jP.triggerMenu(); return false; });
			},

			destroyClickListeners: function() {
				$(document).off('click',jP.options.trigger,null);
			},

			initiateKeyboardListeners: function() {
				$(document).on('keydown',function(e){
					switch (e.which) {
						case 27:
							if ( jP.menuIsOpen() ) jP.closeMenu();
							break;

						case 37:
							if ( jP.menuIsOpen() ) jP.closeMenu();
							break;

						case 39:
							jP.triggerMenu();
							break;

						case 77:
							jP.triggerMenu();
							break;
					}
					return false;
				});
			},

			destroyKeyboardListeners: function() {
				$(document).off('keydown',null);
			},

			setupMarkup: function() {
				$('html').addClass('jPanelMenu');
				$('body > *').not('#jPanelMenu-menu, style, script').wrapAll('<div class="jPanelMenu-panel"/>');
				$(jP.options.menu).hide().clone().attr('id','jPanelMenu-menu').insertAfter('body > .jPanelMenu-panel');
			},

			resetMarkup: function() {
				$('html').removeClass('jPanelMenu');
				$('body > .jPanelMenu-panel > *').unwrap();
				$('#jPanelMenu-menu').remove();
			},

			init: function() {
				jP.initiateClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.initiateKeyboardListeners(); }

				jP.setMenuState(false);
				jP.setupMarkup();
				jP.setMenuStyle({
					width: jP.options.openPosition + '%'
				});
			},

			destroy: function() {
				jP.destroyClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.destroyKeyboardListeners(); }

				jP.setMenuState(false);
				jP.resetMarkup();
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