(function($){
	$.jPanelMenu = function(options){
		if ( typeof(options) == "undefined" || options == null ) { options = {}; };
		var jP = {
			options: $.extend({
				trigger: '.menu-trigger',
				menu: '#menu',
				fixedChildren: '',
				keyboardShortcuts: true,

				openPosition: 75,

				duration: 150,
				openDuration: options.duration || 150,
				closeDuration: options.duration || 150,

				easing: 'swing',
				openEasing: options.easing || 'swing',
				closeEasing: options.easing || 'swing',

				before: function(){ console.log('jP.options.before();'); },
				beforeOpen: function(){ console.log('jP.options.beforeOpen();'); },
				beforeClose: function(){ console.log('jP.options.beforeClose();'); },

				after: function(){ console.log('jP.options.after();'); },
				afterOpen: function(){ console.log('jP.options.afterOpen();'); },
				afterClose: function(){ console.log('jP.options.afterClose();'); }
			},options),

			menu: '#jPanelMenu-menu',

			panel: '.jPanelMenu-panel',

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
				$(jP.menu).css(styles);
			},

			setPanelStyle: function(styles) {
				$(jP.panel).css(styles);
			},

			openMenu: function(animated) {
				jP.options.before();
				jP.options.beforeOpen();

				jP.setMenuState(true);

				if ( animated ) {
					console.log('openMenu(animated);')
				}
				else {
					console.log('openMenu();')
				}

				jP.options.after();
				jP.options.afterOpen();
			},

			closeMenu: function(animated) {
				jP.options.before();
				jP.options.beforeClose();

				jP.setMenuState(false);

				if ( animated ) {
					console.log('closeMenu(animated);')
				}
				else {
					console.log('closeMenu();')
				}

				jP.options.after();
				jP.options.afterClose();
			},

			triggerMenu: function() {
				console.log('--------------------------------------------------');
				if ( jP.menuIsOpen() ) jP.closeMenu();
				else jP.openMenu(true);
				console.log('Fixed Children: ',jP.options.fixedChildren);
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
				$('body > *').not(jP.menu + ', style, script').wrapAll('<div class="' + jP.panel.replace('.','') + '"/>');
				$(jP.options.menu).hide().clone().attr('id', jP.menu.replace('#','')).insertAfter('body > ' + jP.panel);
			},

			resetMarkup: function() {
				$('html').removeClass('jPanelMenu');
				$('body > ' + jP.panel + ' > *').unwrap();
				$(jP.menu).remove();
			},

			init: function() {
				jP.closeMenu();
				jP.initiateClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.initiateKeyboardListeners(); }

				jP.setMenuState(false);
				jP.setupMarkup();
				jP.setMenuStyle({
					width: jP.options.openPosition + '%'
				});
			},

			destroy: function() {
				jP.closeMenu();
				jP.destroyClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.destroyKeyboardListeners(); }

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