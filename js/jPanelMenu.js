(function($){
	$.jPanelMenu = function(options) {
		if ( typeof(options) == "undefined" || options == null ) { options = {}; };

		var jP = {
			options: $.extend({
				menu: '#menu',
				trigger: '.menu-trigger',

				keyboardShortcuts: true,

				openPosition: '250px',

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

			enableTransitions: function(duration, easing) {
				var formattedDuration = duration/1000;
				var formattedEasing = jP.getCSSEasingFunction(easing);
				jP.disableTransitions();
				$('body').append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{-webkit-transition: all ' + formattedDuration + 's ' + formattedEasing + '; -moz-transition: all ' + formattedDuration + 's ' + formattedEasing + '; -o-transition: all ' + formattedDuration + 's ' + formattedEasing + '; transition: all ' + formattedDuration + 's ' + formattedEasing + ';}</style>');
			},

			disableTransitions: function() {
				$('#jPanelMenu-style-transitions').remove();
			},

			enableFixedTransitions: function(selector, id, duration, easing) {
				var formattedDuration = duration/1000;
				var formattedEasing = jP.getCSSEasingFunction(easing);
				jP.disableFixedTransitions(id);
				$('body').append('<style id="jPanelMenu-style-fixed-' + id + '">' + selector + '{-webkit-transition: all ' + formattedDuration + 's ' + formattedEasing + '; -moz-transition: all ' + formattedDuration + 's ' + formattedEasing + '; -o-transition: all ' + formattedDuration + 's ' + formattedEasing + '; transition: all ' + formattedDuration + 's ' + formattedEasing + ';}</style>');
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

			openMenu: function(animated) {
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
				$(document).on('click',jP.options.trigger,function(){ jP.triggerMenu(true); return false; });
			},

			destroyClickListeners: function() {
				$(document).off('click',jP.options.trigger,null);
			},

			initiateContentClickListeners: function() {
				$(document).on('click',jP.panel,function(e){
					if ( jP.menuIsOpen() )
					{
						if ( !$(e.target).hasClass('menu-trigger') ) { jP.closeMenu(true); }
					}
				});
				
				$(document).on('touchend',jP.panel,function(e){
					if ( jP.menuIsOpen() )
					{
						if ( !$(e.target).hasClass('menu-trigger') ) { jP.closeMenu(true); }
					}
				});
			},

			destroyContentClickListeners: function() {
				$(document).off('click',jP.panel,null);
				$(document).off('touchend',jP.panel,null);
			},

			initiateKeyboardListeners: function() {
				$(document).on('keydown',function(e){
					switch (e.which) {
						case 27:
							if ( jP.menuIsOpen() ) jP.closeMenu(true);
							return false;
							break;

						case 37:
							if ( jP.menuIsOpen() ) jP.closeMenu(true);
							return false;
							break;

						case 39:
							jP.triggerMenu(true);
							return false;
							break;

						case 77:
							jP.triggerMenu(true);
							return false;
							break;
					}
				});
			},

			destroyKeyboardListeners: function() {
				$(document).off('keydown',null);
			},

			setupMarkup: function() {
				$('html').addClass('jPanelMenu');
				$('body > *').not(jP.menu + ', style, script').wrapAll('<div class="' + jP.panel.replace('.','') + '"/>');
				$(jP.options.menu).clone().attr('id', jP.menu.replace('#','')).insertAfter('body > ' + jP.panel);
			},

			resetMarkup: function() {
				$('html').removeClass('jPanelMenu');
				$('body > ' + jP.panel + ' > *').unwrap();
				$(jP.menu).remove();
			},

			init: function() {
				jP.initiateClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.initiateKeyboardListeners(); }

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
				jP.destroyClickListeners();
				if ( jP.options.keyboardShortcuts ) { jP.destroyKeyboardListeners(); }

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