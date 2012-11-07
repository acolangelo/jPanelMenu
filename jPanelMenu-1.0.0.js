/**
  *
  * jPanelMenu 1.0.0 (http://jpanelmenu.com)
  * By Anthony Colangelo (http://acolangelo.com)
  *
* */

(function($){
	$.jPanelMenu = function(options) {
		if ( typeof(options) == "undefined" || options == null ) { options = {}; };

		var jP = {
			options: $.extend({
				menu: '#menu',
				trigger: '.menu-trigger',
				excludedPanelContent: 'style, script',

				openPosition: '250px',
				animated: true,

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
				afterClose: function(){ }
			},options),

			settings: {
				transitionsSupported:	'WebkitTransition' in document.body.style ||
										'MozTransition' in document.body.style ||
										'msTransition' in document.body.style ||
										'OTransition' in document.body.style ||
										'Transition' in document.body.style
				,
				shiftFixedChildren: false,
				panelPosition: 'relative',
				positionUnits: 'px'
			},

			menu: '#jPanelMenu-menu',

			panel: '.jPanelMenu-panel',

			fixedChildren: [],

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

				for ( unitID in allowedUnits ) {
					var unit = allowedUnits[unitID];
					if ( jP.options.openPosition.toString().substr(-unit.length) == unit )
					{
						foundUnit = true;
						jP.settings.positionUnits = unit;
					}
				}

				if ( !foundUnit ) { jP.options.openPosition = parseInt(jP.options.openPosition) + jP.settings.positionUnits }
			},

			checkFixedChildren: function() {
				jP.disableTransitions();

				var defaultPanelStyle = {
					position: $(jP.panel).css('position'),
					left: ($(jP.panel).css('left') == 'auto')?0:$(jP.panel).css('left')
				};

				$(jP.panel).find('> *').each(function(){
					if ( $(this).css('position') == 'fixed' && $(this).css('left') == 'auto' ) { jP.fixedChildren.push(this); }
				});

				if ( jP.fixedChildren.length > 0 )
				{
					jP.setPanelStyle({
						position: 'relative',
						left: '1px'
					});

					if ( parseInt($(jP.fixedChildren[0]).offset().left) == 0 ) { jP.settings.shiftFixedChildren = true; }
				}

				jP.setPanelStyle(defaultPanelStyle);
			},

			setjPanelMenuStyles: function() {
				var bgColor = '#fff';
				var htmlBG = $('html').css('background-color');
				var bodyBG = $('body').css('background-color');
				var vpHeight = $(window).height();

				if ( bodyBG != 'transparent' && bodyBG != "rgba(0, 0, 0, 0)") { bgColor = bodyBG; }
				else if ( htmlBG != 'transparent' && htmlBG != "rgba(0, 0, 0, 0)") { bgColor = htmlBG; }
				else { bgColor = '#fff'; }

				if ( $('#jPanelMenu-style-master').length == 0 )
				{
					$('body').append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:block;position:fixed;top:0;left:0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;left:0;top:0;z-index:2;width:100%;min-height:' + vpHeight + 'px;background:' + bgColor + '}</style>');
				}
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

			getPrefix: function(prop) {
				var prefixes = ['Moz','Webkit','Khtml','0','ms'],
					elem     = document.createElement('div'),
					upper      = prop.charAt(0).toUpperCase() + prop.slice(1),
					pref     = "";
				for(var len = prefixes.length; len--;){
					if((prefixes[len] + upper) in elem.style){
						pref = (prefixes[len]);
					}
				}
				if(prop in elem.style){
					pref = (prop);
				}
				return '-' + pref.toLowerCase() + '-';
			},

			enableTransitions: function(duration, easing) {
				var formattedDuration = duration/1000;
				var formattedEasing = jP.getCSSEasingFunction(easing);
				var formattedTransition = jP.getPrefix('transition') + 'transition';
				jP.disableTransitions();
				$('body').append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{' + formattedTransition + ': all ' + formattedDuration + 's ' + formattedEasing + '; transition: all ' + formattedDuration + 's ' + formattedEasing + ';}</style>');
			},

			disableTransitions: function() {
				$('#jPanelMenu-style-transitions').remove();
			},

			enableFixedTransitions: function(selector, id, duration, easing) {
				var formattedDuration = duration/1000;
				var formattedEasing = jP.getCSSEasingFunction(easing);
				var formattedTransition = jP.getPrefix('transition') + 'transition';
				jP.disableFixedTransitions(id);
				$('body').append('<style id="jPanelMenu-style-fixed-' + id + '">' + selector + '{' + formattedTransition + ': all ' + formattedDuration + 's ' + formattedEasing + '; transition: all ' + formattedDuration + 's ' + formattedEasing + ';}</style>');
			},

			disableFixedTransitions: function(id) {
				$('#jPanelMenu-style-fixed-' + id).remove();
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

			testTransform: function() {
				var el = document.createElement('p'),
				has3d,
				transforms = {
					'WebkitTransform':'-webkit-transform',
					'OTransform':'-o-transform',
					'MSTransform':'-ms-transform',
					'MozTransform':'-moz-transform',
					'Transform':'transform'
				};

				document.body.insertBefore(el, null);

				for(var t in transforms){
					if( el.style[t] !== undefined ){
						el.style[t] = 'translate3d(1px,1px,1px)';
						has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
					}
				}

				document.body.removeChild(el);

				if (has3d !== undefined && has3d.length > 0 && has3d !== "none") return true;
				else return false;
			},

			openMenu: function(animated) {
				if ( typeof(animated) == "undefined" || animated == null ) { animated = jP.options.animated };

				jP.clearTimeouts();

				jP.options.before();
				jP.options.beforeOpen();

				jP.setMenuState(true);

				jP.setPanelStyle({ position: 'relative' });

				jP.showMenu();

				var animationChecks = {
					none: (!animated)?true:false,
					transitions: (animated && jP.settings.transitionsSupported)?true:false
				};

				if ( animationChecks.transitions || animationChecks.none ) {
					if ( animationChecks.none ) jP.disableTransitions();
					if ( animationChecks.transitions ) jP.enableTransitions(jP.options.openDuration, jP.options.openEasing);

					if(jP.testTransform) {
                        var transform = jP.getPrefix('transform') + 'transform';
                        $(jP.panel).css(transform,'translate3d(' + jP.options.openPosition + ',0,0)');
                    }
                    else {

						jP.setPanelStyle({ left: jP.options.openPosition });

						if ( jP.settings.shiftFixedChildren )
						{
							$(jP.fixedChildren).each(function(){
								var id = $(this).prop("tagName").toLowerCase() + ' ' + $(this).attr('class'),
									selector = id.replace(' ','.'),
									id = id.replace(' ','-')
								;

								if ( animationChecks.none ) jP.disableFixedTransitions(id);
								if ( animationChecks.transitions ) jP.enableFixedTransitions(selector, id, jP.options.openDuration, jP.options.openEasing);

								$(this).css({
									left: jP.options.openPosition
								});
							});
						}
					}

					jP.timeouts.afterOpen = setTimeout(function(){
						jP.disableTransitions();
						if ( jP.settings.shiftFixedChildren )
						{
							$(jP.fixedChildren).each(function(){
								var id = $(this).prop("tagName").toLowerCase() + ' ' + $(this).attr('class'),
									id = id.replace(' ','-')
								;

								jP.disableFixedTransitions(id);
							});
						}

						jP.options.after();
						jP.options.afterOpen();
						jP.initiateContentTouchListeners();
						jP.initiateContentClickListeners();
					}, jP.options.openDuration);
				}
				else {
					var formattedEasing = jP.getJSEasingFunction(jP.options.openEasing);

					$(jP.panel).stop().animate({
						left: jP.options.openPosition
					}, jP.options.openDuration, formattedEasing, function(){
						jP.options.after();
						jP.options.afterOpen();
						jP.initiateContentTouchListeners();
						jP.initiateContentClickListeners();
					});

					if ( jP.settings.shiftFixedChildren )
					{
						$(jP.fixedChildren).each(function(){
							$(this).stop().animate({
								left: jP.options.openPosition
							}, jP.options.openDuration, formattedEasing);
						});
					}
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

					if(jP.testTransform) {
                        transform = jP.getPrefix('transform') + 'transform';
                        $(jP.panel).css(transform,'translate3d(0,0,0)');
                    }
                    else {
						jP.setPanelStyle({ left: 0 + jP.settings.positionUnits });

						if ( jP.settings.shiftFixedChildren )
						{
							$(jP.fixedChildren).each(function(){
								var id = $(this).prop("tagName").toLowerCase() + ' ' + $(this).attr('class'),
									selector = id.replace(' ','.'),
									id = id.replace(' ','-')
								;

								if ( animationChecks.none ) jP.disableFixedTransitions(id);
								if ( animationChecks.transitions ) jP.enableFixedTransitions(selector, id, jP.options.closeDuration, jP.options.closeEasing);

								$(this).css({
									left: 0 + jP.settings.positionUnits
								});
							});
						}
					}

					jP.timeouts.afterClose = setTimeout(function(){
						jP.setPanelStyle({ position: jP.settings.panelPosition });

						jP.disableTransitions();
						if ( jP.settings.shiftFixedChildren )
						{
							$(jP.fixedChildren).each(function(){
								var id = $(this).prop("tagName").toLowerCase() + ' ' + $(this).attr('class'),
									id = id.replace(' ','-')
								;

								jP.disableFixedTransitions(id);
							});
						}

						jP.hideMenu();
						jP.options.after();
						jP.options.afterClose();
						jP.destroyContentTouchListeners();
						jP.destroyContentClickListeners();
					}, jP.options.closeDuration);
				}
				else {
					var formattedEasing = jP.getJSEasingFunction(jP.options.closeEasing);

					$(jP.panel).stop().animate({
						left: '0%'
					}, jP.options.closeDuration, formattedEasing, function(){
						jP.setPanelStyle({ position: jP.settings.panelPosition });

						jP.hideMenu();
						jP.options.after();
						jP.options.afterClose();
						jP.destroyContentTouchListeners();
						jP.destroyContentClickListeners();
					});

					if ( jP.settings.shiftFixedChildren )
					{
						$(jP.fixedChildren).each(function(){
							$(this).stop().animate({
								left: 0 + jP.settings.positionUnits
							}, jP.options.closeDuration, formattedEasing);
						});
					}
				}
			},

			triggerMenu: function(animated) {
				if ( jP.menuIsOpen() ) jP.closeMenu(animated);
				else jP.openMenu(animated);
			},

			initiateClickListeners: function() {
				$(document).on('click',jP.options.trigger,function(){ jP.triggerMenu(jP.options.animated); return false; });
			},

			destroyClickListeners: function() {
				$(document).off('click',jP.options.trigger,null);
			},

			initiateContentClickListeners: function() {
				$(document).on('click',jP.panel,function(e){
					if ( jP.menuIsOpen() )
					{
						if ( !$(e.target).hasClass('menu-trigger') ) { jP.closeMenu(jP.options.animated); }
					}
				});
			},

			destroyContentClickListeners: function() {
				$(document).off('click',jP.panel,null);
			},

			initiateKeyboardListeners: function() {
				$(document).on('keydown',function(e){
					for ( mapping in jP.options.keyboardShortcuts ) {
						if ( e.which == jP.options.keyboardShortcuts[mapping].code )
						{
							var key = jP.options.keyboardShortcuts[mapping];

							if ( key.open && key.close ) { jP.triggerMenu(jP.options.animated); }
							else if ( (key.open && !key.close) && !jP.menuIsOpen() ) { jP.openMenu(jP.options.animated); }
							else if ( (!key.open && key.close) && jP.menuIsOpen() ) { jP.closeMenu(jP.options.animated); }

							return false;
						}
					}
				});
			},

			destroyKeyboardListeners: function() {
				$(document).off('keydown',null);
			},

			initiateTouchListeners: function() {

				$(document).on('touchstart',jP.options.trigger,function(e){
					var touch = event.touches[0];
					xOrg = touch.pageX;
					xCur = xOrg;

					e.preventDefault();

				});

				$(document).on('touchmove',jP.options.trigger,function(e){
					jP.showMenu();

					var touch = event.touches[0];
					xCur = touch.pageX;
					xDif = (xCur - xOrg);
					offSet = parseInt(jP.options.openPosition);
					half = offSet * '.5';
					if(xDif > 0) xDis = xDif;
					else xDis = (xDif * -1);

					if( xCur < offSet && xDif > 0 )
					{
						if(jP.testTransform) {
                            transform = jP.getPrefix('transform') + 'transform';
                            $(jP.panel).css(transform, transDis);
                        }
                        else {
                            jP.setPanelStyle({ left : xDis +'px'});
                        }
					 }
					else if( xDif < 0 && (offSet - xDis) > 0 && jP.menuIsOpen() )
					{
						if(jP.testTransform) {
                            transform = jP.getPrefix('transform') + 'transform';
                            $(jP.panel).css(transform, transDis);
                        }
                        else {
                            jP.setPanelStyle({ left : (offSet - xDis) + 'px' });
                        }
					}

				});

				$(document).on('touchend',jP.options.trigger,function(e){
					xEnd = xCur;

					if ( xEnd === xOrg )
					{
						jP.triggerMenu(jP.options.animated); return false;
					}
					else if ( jP.menuIsOpen() )
					{
						if (xDis > half) jP.closeMenu();
						else jP.openMenu();
					}
					else
					{
						if (xDis > half) jP.openMenu();
						else jP.closeMenu();
					}
				});
			},

			destroyTouchListeners: function() {
				$(document).off('touchstart',jP.options.trigger,null);
				$(document).off('touchmove',jP.options.trigger,null);
				$(document).off('touchend',jP.options.trigger,null);
			},

			initiateContentTouchListeners: function() {

				$(document).on('touchstart',jP.panel,function(e){
					var touch = event.touches[0];
					xOrg = touch.pageX;
					xCur = xOrg;

					if( jP.menuIsOpen() ){ e.preventDefault(); }

				});

				$(document).on('touchmove',jP.panel,function(e){

					var touch = event.touches[0];
					xCur = touch.pageX;
					xDif = (xCur - xOrg);
					offSet = parseInt(jP.options.openPosition);
					half = offSet * '.5';
					if(xDif > 0) xDis = xDif;
					else xDis = (xDif * -1);

					if( xDif < 0 && (offSet - xDis) > 0 && jP.menuIsOpen() )
					{
						if(jP.testTransform) {
                            transform = jP.getPrefix('transform') + 'transform';
                            $(jP.panel).css(transform, transDis);
                        }
                        else {
                            jP.setPanelStyle({ left : (offSet - xDis) + 'px' });
                        }
					}

				});

				$(document).on('touchend',jP.panel,function(e){
					xEnd = xCur;

					if ( jP.menuIsOpen() )
					{

						if ( xEnd === xOrg )
						{
							jP.closeMenu(jP.options.animated);
						}
						else
						{
							if (xDis > half) jP.closeMenu();
							else jP.openMenu();
						}
					}
				});

			},

			destroyContentTouchListeners: function() {
				$(document).off('touchstart',jP.panel,null);
				$(document).off('touchmove',jP.panel,null);
				$(document).off('touchend',jP.panel,null);
			},

			setupMarkup: function() {
				$('html').addClass('jPanelMenu');
				$('body > *').not(jP.menu + ', ' + jP.options.excludedPanelContent).wrapAll('<div class="' + jP.panel.replace('.','') + '"/>');
				$(jP.options.menu).clone().attr('id', jP.menu.replace('#','')).insertAfter('body > ' + jP.panel);
			},

			resetMarkup: function() {
				$('html').removeClass('jPanelMenu');
				$('body > ' + jP.panel + ' > *').unwrap();
				$(jP.menu).remove();
			},

			init: function() {
				jP.initiateTouchListeners();
				jP.initiateClickListeners();
				if ( Object.prototype.toString.call(jP.options.keyboardShortcuts) === '[object Array]' ) { jP.initiateKeyboardListeners(); }

				jP.setjPanelMenuStyles();
				jP.setMenuState(false);
				jP.setupMarkup();

				jP.setMenuStyle({
					width: jP.options.openPosition
				});

				jP.checkFixedChildren();
				jP.setPositionUnits();

				jP.closeMenu(false);
			},

			destroy: function() {
				jP.closeMenu();
				jP.destroyTouchListeners();
				jP.destroyClickListeners();
				if ( Object.prototype.toString.call(jP.options.keyboardShortcuts) === '[object Array]' ) { jP.destroyKeyboardListeners(); }

				jP.resetMarkup();
				$(jP.fixedChildren).each(function(){ $(this).css({ left: 'auto' }); });
				jP.fixedChildren = [];
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
			getPanel: function() { return $(jP.panel); }
		};
	};
})(jQuery);
