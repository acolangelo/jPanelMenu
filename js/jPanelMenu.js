(function($){
	$.jPanelMenu = function(options){
		if ( typeof(options) == "undefined" || options == null ) { options = {}; };
		var jP = {
			options: $.extend({
				trigger: '.menu-trigger',
				menu: '#menu',
				keyboardShortcuts: true,
				transformsSupported: ($('html').hasClass('csstransitions'))?true:false,

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

				$(jP.menu).css({
					display: 'block'
				});
				
				setTimeout(function(){
					$(jP.panel).addClass('open');
				},50);

				if ( animated ) {
				}
				else {
				}
			},

			closeMenu: function(animated) {
				jP.options.before();
				jP.options.beforeClose();

				jP.setMenuState(false);

				$(jP.panel).removeClass('open');

				setTimeout(function(){
					$(jP.menu).css({
						display: 'none'
					});
				},100);

				if ( animated ) {
				}
				else {
				}

				jP.options.after();
				jP.options.afterClose();
			},

			triggerMenu: function(animated) {
				console.log(' ');
				console.log('--------------------------------------------------');
				console.log(' ');
				if ( jP.menuIsOpen() ) jP.closeMenu(animated);
				else jP.openMenu(animated);
			},

			initiateClickListeners: function() {
				$(document).on('click',jP.options.trigger,function(){ jP.triggerMenu(true); return false; });
			},

			destroyClickListeners: function() {
				$(document).off('click',jP.options.trigger,null);
			},

			initiateKeyboardListeners: function() {
				$(document).on('keydown',function(e){
					switch (e.which) {
						case 27:
							if ( jP.menuIsOpen() ) jP.closeMenu(true);
							break;

						case 37:
							if ( jP.menuIsOpen() ) jP.closeMenu(true);
							break;

						case 39:
							jP.triggerMenu(true);
							break;

						case 77:
							jP.triggerMenu(true);
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
				if ( jP.options.openPosition > 100 ) { jP.options.openPosition = 100; }

				jP.closeMenu();
				jP.initiateClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.initiateKeyboardListeners(); }

				jP.setMenuState(false);
				jP.setupMarkup();
				jP.setMenuStyle({
					width: jP.options.openPosition + '%'
				});

				$(jP.panel).find(' > *').each(function(){
					if ( $(this).css('position') == 'fixed' && $(this).css('left') == 'auto' ) {
						$(this).css('left','0%');
					}
				});

				$(jP.panel).css({
					position: 'relative'
				});

				if ( jP.options.transformsSupported )
				{
					if ( $('#jPanelMenu-transform-styles').length == 0 )
					{
						$('body').append('<style id="jPanelMenu-transform-styles">.jPanelMenu-panel{-webkit-transition: all .1s ease-in-out;} .jPanelMenu-panel.open{left:' + jP.options.openPosition + '%;}</style>');
					}
				}

				console.log('Transforms supported: ', jP.options.transformsSupported);
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