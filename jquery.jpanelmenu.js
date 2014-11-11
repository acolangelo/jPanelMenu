/**
  *
  * jPanelMenu 1.4.1 (http://jpanelmenu.com)
  * By Anthony Colangelo (http://acolangelo.com)
  *
* */

(function($){
	$.jPanelMenu = function(options) {
		if ( typeof(options) == "undefined" || options == null ) { options = {}; };

		var jP = {
			options: $.extend({
				menu: '#menu',
				panel: 'body',
				trigger: '.menu-trigger',
				excludedPanelContent: 'style, script',
				clone: true,
				keepEventHandlers: false,

				direction: 'left',
				openPosition: '250px',
				animated: true,
				closeOnContentClick: true,

				keyboardShortcuts: [
					{
						code: 27,
						open: false,
						close: true 
					},
					{
						code: 37,
						open: false,
						close: true 
					},
					{
						code: 39,
						open: true,
						close: true 
					},
					{
						code: 77,
						open: true,
						close: true 
					}
				],

				duration: 150,
				openDuration: options.duration || 150,
				closeDuration: options.duration || 150,

				easing: 'ease-in-out',
				openEasing: options.easing || 'ease-in-out',
				closeEasing: options.easing || 'ease-in-out',

				before: function(){ },
				beforeOpen: function(){ },
				beforeClose: function(){ },

				after: function(){ },
				afterOpen: function(){ },
				afterClose: function(){ },

				beforeOn: function(){ },
				afterOn: function(){ },

				beforeOff: function(){ },
				afterOff: function(){ }
			},options),

			settings: {
				transitionsSupported:	'WebkitTransition' in document.body.style ||
										'MozTransition' in document.body.style ||
										'msTransition' in document.body.style ||
										'OTransition' in document.body.style ||
										'Transition' in document.body.style
				,
				transformsSupported:	'WebkitTransform' in document.body.style ||
										'MozTransform' in document.body.style ||
										'msTransform' in document.body.style ||
										'OTransform' in document.body.style ||
										'Transform' in document.body.style
				,
				cssPrefix: '',
				panelPosition: 'static',
				positionUnits: 'px'
			},

			menu: '#jPanelMenu-menu',

			panel: '.jPanelMenu-panel',

			timeouts: {},

			clearTimeouts: function() {
				clearTimeout(jP.timeouts.open);
				clearTimeout(jP.timeouts.afterOpen);
				clearTimeout(jP.timeouts.afterClose);
			},

			setPositionUnits: function() {
				var foundUnit = false,
					allowedUnits = ['%','px','em']
				;

				for (var unitID = 0; unitID < allowedUnits.length; unitID++) {
					var unit = allowedUnits[unitID];
					if ( jP.options.openPosition.toString().substr(-unit.length) == unit )
					{
						foundUnit = true;
						jP.settings.positionUnits = unit;
					}
				}

				if ( !foundUnit ) { jP.options.openPosition = parseInt(jP.options.openPosition) + jP.settings.positionUnits }
			},

			computePositionStyle: function(open, string) {
				var position = (open)?jP.options.openPosition:'0' + jP.settings.positionUnits;
				var property = {};
				if ( jP.settings.transformsSupported ) {
					var direction = (open && jP.options.direction == 'right')?'-':'';
					var translate = 'translate3d(' + direction + position + ',0,0)';
					var transform = 'transform';

					if ( string ) {
						property = '';
						if ( jP.settings.cssPrefix != '' ) { property = jP.settings.cssPrefix + transform + ':' + translate + ';' }
						property += transform + ':' + translate + ';';
					} else {
						if ( jP.settings.cssPrefix != '' ) {  property[jP.settings.cssPrefix + transform] = translate; }
						property[transform] = translate;
					}
				} else {
					if ( string ) {
						property = '';
						property = jP.options.direction + ': ' + position + ';';
					} else {
						property[jP.options.direction] = position;
					}
				}
				return property;
			},

			setCSSPrefix: function() {
				jP.settings.cssPrefix = jP.getCSSPrefix();
			},

			setjPanelMenuStyles: function() {
				var bg = 'background:#fff',
					htmlBG = $('html').css('background-color'),
					bodyBG = $('body').css('background-color');

				var backgroundGenerator = function(element){
					var bgs = [];
					$.each(['background-color','background-image','background-position','background-repeat','background-attachment','background-size','background-clip'], function(i,value){
						if( element.css(value) !== '' ) {
							bgs.push(value+':'+element.css(value));
						}
					});
					return bgs.join(';');
				};

				if ( bodyBG !== 'transparent' && bodyBG !== "rgba(0, 0, 0, 0)") {
					bg = backgroundGenerator($('body'));
				} else if ( htmlBG !== 'transparent' && htmlBG !== "rgba(0, 0, 0, 0)") {
					bg = backgroundGenerator($('html'));
				}
				
				if ( $('#jPanelMenu-style-master').length == 0 ) {
					$('body').append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:block;position:fixed;top:0;'+jP.options.direction+':0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;'+jP.options.direction+':0;top:0;z-index:2;width:100%;min-height:100%;' + bg + ';}</style>');
				}
			},

			setMenuState: function(open) {
				var position = (open)?'open':'closed';
				$(jP.options.panel).attr('data-menu-position', position);
			},

			getMenuState: function() {
				return $(jP.options.panel).attr('data-menu-position');
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

			showMenu: function() {
				jP.setMenuStyle({
					display: 'block'
				});
				jP.setMenuStyle({
					'z-index': '1'
				});
			},

			hideMenu: function() {
				jP.setMenuStyle({
					'z-index': '-1'
				});
				jP.setMenuStyle({
					display: 'none'
				});
			},

			enableTransitions: function(duration, easing) {
				var formattedDuration = duration/1000;
				var formattedEasing = jP.getCSSEasingFunction(easing);
				jP.disableTransitions();
				$('body').append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{' + jP.settings.cssPrefix + 'transition: all ' + formattedDuration + 's ' + formattedEasing + '; transition: all ' + formattedDuration + 's ' + formattedEasing + ';}</style>');
			},

			disableTransitions: function() {
				$('#jPanelMenu-style-transitions').remove();
			},

			getCSSEasingFunction: function(name) {
				switch ( name )
				{
					case 'linear':
						return name;
						break;

					case 'ease':
						return name;
						break;

					case 'ease-in':
						return name;
						break;

					case 'ease-out':
						return name;
						break;

					case 'ease-in-out':
						return name;
						break;

					default:
						return 'ease-in-out';
						break;
				}
			},

			getJSEasingFunction: function(name) {
				switch ( name )
				{
					case 'linear':
						return name;
						break;

					default:
						return 'swing';
						break;
				}
			},

			getVendorPrefix: function() {
				// Thanks to Lea Verou for this beautiful function. (http://lea.verou.me/2009/02/find-the-vendor-prefix-of-the-current-browser)
				if('result' in arguments.callee) return arguments.callee.result;

				var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;

				var someScript = document.getElementsByTagName('script')[0];

				for(var prop in someScript.style)
				{
					if(regex.test(prop))
					{
						// test is faster than match, so it's better to perform
						// that on the lot and match only when necessary
						return arguments.callee.result = prop.match(regex)[0];
					}

				}

				// Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
				// However (prop in style) returns the correct value, so we'll have to test for
				// the precence of a specific property
				if('WebkitOpacity' in someScript.style) return arguments.callee.result = 'Webkit';
				if('KhtmlOpacity' in someScript.style) return arguments.callee.result = 'Khtml';

				return arguments.callee.result = '';
			},

			getCSSPrefix: function() {
				var prefix = jP.getVendorPrefix();
				if ( prefix != '' ) { return '-' + prefix.toLowerCase() + '-'; }
				return '';
			},

			openMenu: function(animated) {
				if ( typeof(animated) == "undefined" || animated == null ) { animated = jP.options.animated };
				
				jP.clearTimeouts();

				jP.options.before();
				jP.options.beforeOpen();

				jP.setMenuState(true);
				
				jP.showMenu();

				var animationChecks = {
					none: (!animated)?true:false,
					transitions: (animated && jP.settings.transitionsSupported)?true:false
				};

				if ( animationChecks.transitions || animationChecks.none ) {
					if ( animationChecks.none ) jP.disableTransitions();
					if ( animationChecks.transitions ) jP.enableTransitions(jP.options.openDuration, jP.options.openEasing);

					var newPanelStyle = jP.computePositionStyle(true);
					jP.setPanelStyle(newPanelStyle);

					jP.timeouts.afterOpen = setTimeout(function(){
						jP.options.after();
						jP.options.afterOpen();
						jP.initiateContentClickListeners();
					}, jP.options.openDuration);
				}
				else {
					var formattedEasing = jP.getJSEasingFunction(jP.options.openEasing);

					var animationOptions = {};
					animationOptions[jP.options.direction] = jP.options.openPosition;
					$(jP.panel).stop().animate(animationOptions, jP.options.openDuration, formattedEasing, function(){
						jP.options.after();
						jP.options.afterOpen();
						jP.initiateContentClickListeners();
					});
				}
			},

			closeMenu: function(animated) {
				if ( typeof(animated) == "undefined" || animated == null ) { animated = jP.options.animated };

				jP.clearTimeouts();

				jP.options.before();
				jP.options.beforeClose();

				jP.setMenuState(false);

				var animationChecks = {
					none: (!animated)?true:false,
					transitions: (animated && jP.settings.transitionsSupported)?true:false
				};

				if ( animationChecks.transitions || animationChecks.none ) {
					if ( animationChecks.none ) jP.disableTransitions();
					if ( animationChecks.transitions ) jP.enableTransitions(jP.options.closeDuration, jP.options.closeEasing);

					var newPanelStyle = jP.computePositionStyle();
					jP.setPanelStyle(newPanelStyle);

					jP.timeouts.afterClose = setTimeout(function(){
						jP.disableTransitions();

						jP.hideMenu();
						jP.options.after();
						jP.options.afterClose();
						jP.destroyContentClickListeners();
					}, jP.options.closeDuration);
				}
				else {
					var formattedEasing = jP.getJSEasingFunction(jP.options.closeEasing);

					var animationOptions = {};
					animationOptions[jP.options.direction] = 0 + jP.settings.positionUnits;
					$(jP.panel).stop().animate(animationOptions, jP.options.closeDuration, formattedEasing, function(){
						jP.hideMenu();
						jP.options.after();
						jP.options.afterClose();
						jP.destroyContentClickListeners();
					});
				}
			},

			triggerMenu: function(animated) {
				if ( jP.menuIsOpen() ) jP.closeMenu(animated);
				else jP.openMenu(animated);
			},

			initiateClickListeners: function() {
				$(document).on('click touchend',jP.options.trigger,function(e){
					jP.triggerMenu(jP.options.animated); e.preventDefault();
				});
			},

			destroyClickListeners: function() {
				$(document).off('click touchend',jP.options.trigger,null);
			},

			initiateContentClickListeners: function() {
				if ( !jP.options.closeOnContentClick ) return false;

				$(document).on('click touchend',jP.panel,function(e){
					if ( jP.menuIsOpen() ) jP.closeMenu(jP.options.animated);
					e.preventDefault();
				});
			},

			destroyContentClickListeners: function() {
				if ( !jP.options.closeOnContentClick ) return false;

				$(document).off('click touchend',jP.panel,null);
			},

			initiateKeyboardListeners: function() {
				var preventKeyListeners = ['input', 'textarea', 'select'];
				$(document).on('keydown',function(e){
					var target = $(e.target),
						prevent = false;

					$.each(preventKeyListeners, function(){
						if (target.is(this.toString())) {
							prevent = true;
						}
					});

					if ( prevent ) return true;

					for ( mapping in jP.options.keyboardShortcuts ) {
						if ( e.which == jP.options.keyboardShortcuts[mapping].code ) {
							var key = jP.options.keyboardShortcuts[mapping];

							if ( key.open && key.close ) { jP.triggerMenu(jP.options.animated); }
							else if ( (key.open && !key.close) && !jP.menuIsOpen() ) { jP.openMenu(jP.options.animated); }
							else if ( (!key.open && key.close) && jP.menuIsOpen() ) { jP.closeMenu(jP.options.animated); }

							e.preventDefault();
						}
					}
				});
			},

			destroyKeyboardListeners: function() {
				$(document).off('keydown',null);
			},

			setupMarkup: function() {
				$('html').addClass('jPanelMenu');
				$(jP.options.panel + ' > *').not(jP.menu + ', ' + jP.options.excludedPanelContent).wrapAll('<div class="' + jP.panel.replace('.','') + '"/>');
				var menu = ( jP.options.clone )?$(jP.options.menu).clone(jP.options.keepEventHandlers):$(jP.options.menu);
				menu.attr('id', jP.menu.replace('#','')).insertAfter(jP.options.panel + ' > ' + jP.panel);
			},

			resetMarkup: function() {
				$('html').removeClass('jPanelMenu');
				$(jP.options.panel + ' > ' + jP.panel + ' > *').unwrap();
				$(jP.menu).remove();
			},

			init: function() {
				jP.options.beforeOn();

				jP.setPositionUnits();
				jP.setCSSPrefix();
				jP.initiateClickListeners();
				if ( Object.prototype.toString.call(jP.options.keyboardShortcuts) === '[object Array]' ) { jP.initiateKeyboardListeners(); }

				jP.setjPanelMenuStyles();
				jP.setMenuState(false);
				jP.setupMarkup();

				jP.setPanelStyle({ position: (( jP.options.animated && jP.settings.panelPosition === 'static' )?'relative':jP.settings.panelPosition) });
				jP.setMenuStyle({ width: jP.options.openPosition });

				jP.closeMenu(false);

				jP.options.afterOn();
			},

			destroy: function() {
				jP.options.beforeOff();

				jP.closeMenu();
				jP.destroyClickListeners();
				if ( Object.prototype.toString.call(jP.options.keyboardShortcuts) === '[object Array]' ) { jP.destroyKeyboardListeners(); }

				jP.resetMarkup();
				var childrenStyles = {};
				childrenStyles[jP.options.direction] = 'auto';

				jP.options.afterOff();
			}
		};

		return {
			on: jP.init,
			off: jP.destroy,
			trigger: jP.triggerMenu,
			open: jP.openMenu,
			close: jP.closeMenu,
			isOpen: jP.menuIsOpen,
			menu: jP.menu,
			getMenu: function() { return $(jP.menu); },
			panel: jP.panel,
			getPanel: function() { return $(jP.panel); },
			setPosition: function(position) {
				if ( typeof(position) == "undefined" || position == null ) {
					position = jP.options.openPosition
				}
				jP.options.openPosition = position;
				jP.setMenuStyle({ width: jP.options.openPosition });
			}
		};
	};
})(jQuery);
