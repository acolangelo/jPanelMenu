(function($){
	$.jPanelMenu = function(options){
		if ( typeof(options) == "undefined" || options == null ) { options = {}; };
		var jP = {
			options: $.extend({
				trigger: '.menu-trigger',
				menu: '#menu',
				keyboardShortcuts: true,
				transitionsSupported:	'WebkitTransition' in document.body.style ||
										'MozTransition' in document.body.style ||
										'msTransition' in document.body.style ||
										'OTransition' in document.body.style ||
										'Transition' in document.body.style
				,
				shiftFixedChildren: false,

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

			fixedChildren: [],

			checkFixedChildren: function() {
				jP.disableTransitions();

				var defaultPanelStyle = {
					position: $(jP.panel).css('position'),
					left: ($(jP.panel).css('left') == 'auto')?0:$(jP.panel).css('left')
				};

				$(jP.panel).find('> *').each(function(){
					if ( $(this).css('position') == 'fixed' ) { jP.fixedChildren.push(this); }
				});
				
				if ( jP.fixedChildren.length > 0 )
				{
					jP.setPanelStyle({
						position: 'relative',
						left: '1px'
					});

					if ( parseInt($(jP.fixedChildren[0]).offset().left) == 0 ) { jP.options.shiftFixedChildren = true; }
				}

				jP.setPanelStyle(defaultPanelStyle);
			},

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

			enableTransitions: function(duration) {
				var formattedDuration = duration/1000;
				jP.disableTransitions();
				$('body').append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{-webkit-transition: all ' + formattedDuration + 's ease-in-out;-moz-transition: all ' + formattedDuration + 's ease-in-out;-o-transition: all ' + formattedDuration + 's ease-in-out;transition: all ' + formattedDuration + 's ease-in-out;}</style>');
			},

			disableTransitions: function() {
				$('#jPanelMenu-style-transitions').remove();
			},

			openMenu: function(animated) {
				jP.options.before();
				jP.options.beforeOpen();

				jP.setMenuState(true);

				if ( (animated && jP.options.transitionsSupported) || (!animated) ) {
					if ( !animated ) { jP.disableTransitions(); }
					else if ( animated && jP.options.transitionsSupported ) { jP.enableTransitions(jP.options.openDuration); }

					jP.setPanelStyle({
						position: 'relative',
						left: jP.options.openPosition + '%'
					});

					if ( !animated ) { jP.enableTransitions(jP.options.openDuration); }

					jP.options.after();
					jP.options.afterOpen();
				}
				else {
					jP.setPanelStyle({
						position: 'relative',
					});

					$(jP.panel).animate({
						left: jP.options.openPosition + '%'
					}, jP.options.openDuration, jP.options.openEasing, function(){
						jP.options.after();
						jP.options.afterOpen();
					});
				}
			},

			closeMenu: function(animated) {
				jP.options.before();
				jP.options.beforeClose();

				jP.setMenuState(false);

				if ( (animated && jP.options.transitionsSupported) || (!animated) ) {
					if ( !animated && jP.options.transitionsSupported ) { jP.disableTransitions(); }
					else if ( animated && jP.options.transitionsSupported ) { jP.enableTransitions(jP.options.closeDuration); }

					jP.setPanelStyle({ left: 0 });
					setTimeout(function(){ jP.setPanelStyle({ position: 'static' }); }, jP.options.closeDuration);

					if ( !animated && jP.options.transitionsSupported ) { jP.enableTransitions(jP.options.closeDuration); }

					jP.options.after();
					jP.options.afterClose();
				}
				else {
					$(jP.panel).animate({
						left: '0%'
					}, jP.options.closeDuration, jP.options.closeEasing, function(){
						jP.options.after();
						jP.options.afterClose();
					});
				}
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

				jP.checkFixedChildren();
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