#<a id="docs" href="#docs">jPanelMenu</a>

###Version 1.4.1

jPanelMenu is a [jQuery](http://jquery.com) plugin for easily creating and managing off-canvas content.

Check out the [demo (and documentation) site](http://jpanelmenu.com) to see it in action.

Check out the [changelog](#changelog) to see what&rsquo;s new.



#<a id="usage" href="#usage">How Do I Use This Thing?</a>

Start off by including the jPanelMenu.js file in your page. (Bonus points for using the minified version [jPanelMenu.min.js], or for bundling the jPanelMenu code into your own JavaScript file to reduce size and HTTP requests.)

Build your page as you normally would (the source order does not matter), and instantiate jPanelMenu by calling the plugin constructor function.

	var jPM = $.jPanelMenu();

By default, jPanelMenu will look for an element with an ID of `menu` to use as the menu, and elements with a class of `menu-trigger` to use as the trigger(s). Either use these IDs and classes on your elements, or pass a custom selector string pointing jPanelMenu to your menu and trigger elements in an object into the constructor function call, as follows:

	var jPM = $.jPanelMenu({
		menu: '#custom-menu-selector',
		trigger: '.custom-menu-trigger-selector'
	});

**Note:** Check out the [options section]($options) for more customizable goodness like the above.

After jPanelMenu has been instantiated (make sure to save the returned object to a variable, as shown above), it&rsquo;s time to turn it on!

	jPM.on();

After that, jPanelMenu will be functioning, and that&rsquo;s it!

If you want to take things to the next level, keep reading.



#<a id="inner-workings" href="#inner-workings">How Does This Thing Work?</a>

When jPanelMenu is [turned on](#api-on), two `<div>` elements are created. The menu element (with an ID of `jPanelMenu-menu`), and the panel element (with a class of `jPanelMenu-panel`). In addition, a class of `jPanelMenu` is applied to the `<html>` tag.

The menu, `#jPanelMenu-menu`, contains the elements targeted by the menu selector passed into the jPanelMenu constructor function. By default, the targeted menu element is cloned into `#jPanelMenu-menu`, and is not removed from its original position in the DOM. This action can be overridden with the [`clone`](#options-clone) option.

The panel, `.jPanelMenu-panel`, contains all of the content in the element specified by the [`panel`](#options-panel) option (except for the elements specified by the [`excludedPanelContent`](#options-excludedPanelContent) option). The selected content is moved, not cloned, into `.jPanelMenu-panel`.

To style or select the menu, use the following selector: `#jPanelMenu-menu`.

To style or select the content panel, use the following selector: `.jPanelMenu-panel`.

When jPanelMenu is [turned off](#api-off), the two `<div>` elements are removed, all of the content inside `.jPanelMenu-panel` is moved back into the `<body>` element, and the class of `jPanelMenu` is removed from the `<html>` tag.



#<a id="animation" href="#animation">Does It Animate?</a>

Of course! (If you want it to, there&rsquo;s an [option](#options) for that.)

Animation is handled by CSS transitions, for browsers with support. CSS transitions are hardware-accelerated on supporting devices, so the animations are silky smooth.

For browsers that do not support CSS transitions, the jQuery animation engine is used as a fallback.



#<a id="options" href="#options">Options</a>

The following options are set via an `object` passed into the constructor function call, as shown below.

	var jPM = $.jPanelMenu({
		menu: '#menu',
		trigger: '.menu-trigger',
		duration: 300
	});

***

###<a href="#options-menu" id="options-menu">menu</a>

A selector string pointing to the desired menu element.

- **Data Type:** `string`
- **Default Value:** `#menu`

***

###<a href="#options-panel" id="options-panel">panel</a>

A selector string pointing to the desired root panel element. Point this to the element containing all content that should go into the panel.

- **Data Type:** `string`
- **Default Value:** `body`

***

###<a href="#options-trigger" id="options-trigger">trigger</a>

A selector string pointing to the menu-triggering element.

- **Data Type:** `string`
- **Default Value:** `.menu-trigger`

***

###<a href="#options-excludedPanelContent" id="options-excludedPanelContent">excludedPanelContent</a>

A selector string specifying which elements within the `<body>` element should **not** be pushed into `.jPanelMenu-panel`. The selector string may contain any selector, not just tags.

Generally, `<style>` and `<script>` tags should not be moved from their original location, but in certain circumstances (mostly advertising), `<script>` tags may need to move with the page content.

- **Data Type:** `string`
- **Default Value:** `style, script`

***

###<a href="#options-clone" id="options-clone">clone</a>

A boolean value specifying whether or not the targeted menu element should be cloned to create `#jPanelMenu-menu`, or simply moved in the DOM.

- **Data Type:** `boolean`
- **Accepted Values:** `true` or `false`
- **Default Value:** `true`

***

###<a href="#options-direction" id="options-direction">direction</a>

A string specifying which direction the menu should open from.

- **Data Type:** `string`
- **Accepted Values:** `left` or `right`
- **Default Value:** `left`

***

###<a href="#options-openPosition" id="options-openPosition">openPosition</a>

The measurement value for the open position of the menu. Can be set as a pixel, percentage, or `em` value.

- **Data Type:** `string`
- **Examples:** `250px`, `75%`, `20em`
- **Default Value:** `250px`

***

###<a href="#options-animated" id="options-animated">animated</a>

A boolean value specifying whether or not the opening and closing of the menu should be animated.

When using the API functions [`open( )`](#api-open), [`close()`](#api-close), and [`trigger()`](#api-trigger), this setting can be overridden by passing in `true` as the parameter. More info in the [API section](#api).

- **Data Type:** `boolean`
- **Accepted Values:** `true` or `false`
- **Default Value:** `true`

***

###<a href="#options-closeOnContentClick" id="options-closeOnContentClick">closeOnContentClick</a>

A boolean value specifying whether or not the menu should be closed when clicking on the panel content.

- **Data Type:** `boolean`
- **Accepted Values:** `true` or `false`
- **Default Value:** `true`

***

###<a href="#options-keyboardShortcuts" id="options-keyboardShortcuts">keyboardShortcuts</a>

An option that allows you to control if keyboard shortcuts are enabled, and if they are, which keys do what.

Setting this option to `false` will disable keyboard shortcuts entirely. To enable keyboard shortcuts, pass in an `array` of `objects`. Each enabled key gets its own `object` in the `array` and each object should be structured as follows:

	{
		code: 27, /* Keycode of enabled key */
		open: true /* Boolean (true or false), specifying whether or not key should open the menu */
		close: false /* Boolean (true or false), specifying whether or not key should close the menu */
	}

- **Data Type:** `array` or `boolean`
- **Accepted Values:** `array` or `false`
- **Default Value:**

	[
		{
			code: 27, /* Escape Key */
			open: false,
			close: true 
		},{
			code: 37, /* Left Arrow Key */
			open: false,
			close: true 
		},{
			code: 39, /* Right Arrow Key */
			open: true,
			close: true 
		},{
			code: 77, /* M Key */
			open: true,
			close: true 
		}
	]

***

###<a href="#options-duration" id="options-duration">duration</a>

The time, in milliseconds, which it should take to open and close the menu, when animated.

- **Data Type:** `int`
- **Default Value:** `150`

***

###<a href="#options-openDuration" id="options-openDuration">openDuration</a>

The time, in milliseconds, which it should take to open the menu, when animated. If set, this overrides the duration option.

- **Data Type:** `int`
- **Default Value:** Inherited from [`duration`](#options-duration)

***

###<a href="#options-closeDuration">closeDuration</a>

The time, in milliseconds, which it should take to close the menu, when animated. If set, this overrides the duration option.

- **Data Type:** `int`
- **Default Value:** Inherited from [`duration`]()

***

###<a href="#options-easing" id="options-easing">easing</a>

The easing function to use when animating the opening and closing of the menu.

- **Data Type:** `string`
- **Accepted Values:** `linear`, `ease`, `ease-in`, `ease-out`, `ase-in-out`
- **Default Value:** `ease-in-out`

***

###<a href="#options-openEasing" id="options-openEasing">openEasing</a>

The easing function to use when animating the opening of the menu. If set, this overrides the easing option.

- **Data Type:** `string`
- **Accepted Values:** `linear`, `ease`, `ease-in`, `ease-out`, `ase-in-out`
- **Default Value:** Inherited from [`easing`](#options-easing)

***

###<a href="#options-closeEasing" id="options-closeEasing">closeEasing</a>

The easing function to use when animating the closing of the menu. If set, this overrides the easing option.

- **Data Type:** `string`
- **Accepted Values:** `linear`, `ease`, `ease-in`, `ease-out`, `ase-in-out`
- **Default Value:** Inherited from [`easing`](#options-easing)

***

###<a href="#options-before" id="options-before">before</a>

Called before the menu is opened or closed, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`

***

###<a href="#options-beforeOpen" id="options-beforeOpen">beforeOpen</a>

Called before the menu is opened, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`

***

###<a href="#options-beforeClose" id="options-beforeClose">beforeClose</a>

Called before the menu is closed, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`

***

###<a href="#options-after" id="options-after">after</a>

Called after the menu is opened or closed, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`

***

###<a href="#options-afterOpen" id="options-afterOpen">afterOpen</a>

Called after the menu is opened, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`

***

###<a href="#options-afterClose" id="options-afterClose">afterClose</a>

Called after the menu is closed, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`

***

###<a href="#options-beforeOn" id="options-beforeOn">beforeOn</a>

Called before the plugin is turned on (when [`on( )`](#api-on) is called).

- **Data Type:** `function`
- **Default Value:** `function(){ }`

***

###<a href="#options-afterOn" id="options-afterOn">afterOn</a>

Called after the plugin is turned on (when [`on( )`](#api-on) is called).

- **Data Type:** `function`
- **Default Value:** `function(){ }`

***

###<a href="#options-beforeOff" id="options-beforeOff">beforeOff</a>

Called before the plugin is turned off (when [`off( )`](#api-off) is called).

- **Data Type:** `function`
- **Default Value:** `function(){ }`

***

###<a href="#options-afterOff" id="options-afterOff">afterOff</a>

Called after the plugin is turned off (when [`off( )`](#api-off) is called).

- **Data Type:** `function`
- **Default Value:** `function(){ }`

#<a id="api" href="#api">API</a>

The following are the methods and properties of the object returned by the jPanelMenu constructor function call. In the following example, these would be the methods and properties of `jPM`.

	var jPM = $.jPanelMenu();

	jPM.on();

	jPM.trigger(true);

###<a href="#api-on" id="api-on">on(&nbsp;)</a>

Initializes a jPanelMenu instance. Sets up the markup, styles, listeners, and interactions, according to the options passed into the constructor function.

- **Returns:** `null`

***

###<a href="#api-off" id="api-off">off(&nbsp;)</a>

Destroys a jPanelMenu instance. Resets the markup and styles, removes listeners and interactions.

- **Returns:** `null`

***

###<a href="#api-trigger" id="api-trigger">trigger(&nbsp;`animated`&nbsp;)</a>

Triggers the opening or closing of the menu, depending on the current state (open or closed).

- **Parameters:**
	- `animated`
		- A boolean value that determines whether or not to animate the action. The action will animate if set to `true`, and will not animate if set to `false`. If no value is set, the value of the [`animated`](#options-animated) option will be used.
		- **Data Type:** `boolean`
		- **Accepted Values:** `true` or `false`
- **Returns:** `null`

***

###<a href="#api-open" id="api-open">open(&nbsp;`animated`&nbsp;)</a>

Triggers the opening of the menu.

- **Parameters:**
	- `animated`
		- A boolean value that determines whether or not to animate the action. The action will animate if set to `true`, and will not animate if set to `false`. If no value is set, the value of the [`animated`](#options-animated) option will be used.
		- **Data Type:** `boolean`
		- **Accepted Values:** `true` or `false`
- **Returns:** `null`

***

###<a href="#api-close" id="api-close">close(&nbsp;`animated`&nbsp;)</a>

Triggers the closing of the menu.

- **Parameters:**
	- `animated`
		- A boolean value that determines whether or not to animate the action. The action will animate if set to `true`, and will not animate if set to `false`. If no value is set, the value of the [`animated`](#options-animated) option will be used.
		- **Data Type:** `boolean`
		- **Accepted Values:** `true` or `false`
- **Returns:** `null`

***

###<a href="#api-isOpen" id="api-isOpen">isOpen(&nbsp;)</a>

Checks the current state of the menu. Returns `true` if the menu is currently open, and `false` if it is closed.

- **Returns:** `boolean`, `true` or `false`

***

###<a href="#api-menu" id="api-menu">menu</a>

A property equal to the raw selector string of the created menu object.

- **Data Type:** `string`

***

###<a href="#api-getMenu" id="api-getMenu">getMenu(&nbsp;)</a>

Returns a `jQuery Object` containing the created menu object.

- **Returns:** `jQuery Object`

***

###<a href="#api-panel" id="api-panel">panel</a>

A property equal to the raw selector string of the created panel object.

- **Data Type:** `string`

***

###<a href="#api-getPanel" id="api-getPanel">getPanel(&nbsp;)</a>

Returns a `jQuery Object` containing the created panel object.

- **Returns:** `jQuery Object`

***

###<a href="#api-setPosition" id="api-setPosition">setPosition(&nbsp;`position`&nbsp;)</a>

Sets the measurement value for the open position of the menu. Can be set as a pixel, percentage, or em value.

- **Parameters:**
	- `position`
		- A measurement value, set as a pixel, percentage, or em value.
		- **Data Type:** `string`
		- **Examples:** `250px`, `75%`, `20em`
- **Returns:** `null`



#<a id="tips" href="#tips">Tips, Best Practices, and Other Good Ideas (with Examples)</a>

jPanelMenu was built to be very open-ended and allow a lot of customization for each implementation. A lot of the customization of jPanelMenu implementations will start with the easy hooks provided by the plugin.

When jPanelMenu is [turned on](#api-on), the following elements are created (or classes applied, in the case of the `<html>` tag):


	<html class="jPanelMenu">
		<head>
			...
		</head>
		<body>
			<div id="jPanelMenu-menu" />
			<div class="jPanelMenu-panel" />
		</body>
	</html>

**Note:** Content abbreviated for simplicity.

In addition, there are a few helpful things to know that will improve specific implementations, regardless of use case.


###<a href="#tips-styling" id="tips-styling">Stylin&rsquo;</a>

There are no default graphical styles injected into your page by jPanelMenu, because, as a developer who loves complete control over my pages, there is nothing I dislike more than plugins which do that. Therefore, all graphical styling is up to you, and jPanelMenu makes it very easy.

When jPanelMenu is [turned on](#api-on), two `<div>` elements are created. The menu element (selector: `#jPanelMenu-menu`), and the panel element (selector: `.jPanelMenu-panel`). In addition, a class of `jPanelMenu` is applied to the `<html>` tag.

The background color of `.jPanelMenu-panel` is set by the plugin, and its value is inherited from the `<body>` element&rsquo;s `background-color`.

If the `<body>` element&rsquo;s `background-color` is not set, the `<html>` element&rsquo;s `background-color` is used. If neither is set, the `background-color` is set to white.


###<a href="#tips-progressive-enhancement" id="tips-progressive-enhancement">Progressive Enhancement</a>

Users without JavaScript (whether they have turned it off or are using a device without it) will obviously not get the interactions provided by jPanelMenu. It&rsquo;s a good idea to take a [&ldquo;progressive enhancement&rdquo;](http://www.alistapart.com/articles/understandingprogressiveenhancement/) approach, and build your site to work without JavaScript and jPanelMenu.

A great way to do this is to use the hooks provided to you by jPanelMenu. When jPanelMenu is [turned on](#api-on), the class `jPanelMenu` is applied to the `<html>` tag (conversely, when jPanelMenu is [turned off](#api-off), this class is removed).

Build your site as you normally would, without JavaScript and without styles specific to JavaScript interactions or plugins. Restrict all jPanelMenu-specific styles and script actions to elements that are descendents of `.jPanelMenu`. Styles such as those which hide elements that are unnecessary with jPanelMenu enabled, or scripting actions specific to jPanelMenu functions, should use the `.jPanelMenu` selector to ensure that their effects only take hold when jPanelMenu is enabled.

That idea was used to create [the demo/documentation page](http://jpanelmenu.com#tips-progressive-enhancement).


###<a href="#tips-jrespond" id="tips-jrespond">jPanelMenu and jRespond &mdash; Perfect Together</a>

I'm a **huge** fan of [jRespond](https://github.com/ten1seven/jRespond), which is &ldquo;a simple way to globally manage JavaScript on responsive websites.&rdquo;

jRespond and jPanelMenu are the perfect couple &mdash; use jRespond to enable and disable jPanelMenu at the appropriate breakpoints, creating a truly great experience. That&rsquo;s how I almost always use jPanelMenu, and I suggest you give it a shot, too.

Responsive design is awesome on its own, but add responsive behavior to the mix, and you&rsquo;ve made something incredible.

Check out the [example](http://jpanelmenu.com/examples/jrespond) of how to use jRespond with jPanelMenu, which includes a basic how-to, code snippets, and helpful tips.


#<a href="#license" id="#license">License</a>

jPanelMenu is distributed freely under the [MIT License](http://opensource.org/licenses/MIT), so you&rsquo;re free to use this plugin on any and all projects.

#<a href="#changelog" id="#changelog">Changelog</a>

###<a href="#changelog-1.4.1" id="changelog-1.4.1">1.4.1</a>

November 11th, 2014

- Added `touchend` listeners for better touch support.

###<a href="#changelog-1.4.0" id="changelog-1.4.0">1.4.0</a>

November 11th, 2014

- Added [`panel`](#options-panel) option.
- Added [`clone`](#options-clone) option.
- Added [`setPosition(&nbsp;)`](#api-setPosition) API method.
- Removed support for fixed positioning within the panel. CSS transforms and fixed positioning [do not get along well, per the spec](http://meyerweb.com/eric/thoughts/2011/09/12/un-fixing-fixed-elements-with-css-transforms/). If fixed positioning is needed, use [the legacy build](https://github.com/acolangelo/jPanelMenu/blob/master/jquery.jpanelmenu-legacy.js) in the jPanelMenu repository.
- Updated `.jPanelMenu-panel` to be positioned statically.
- Updated background handling so that all properties are transferred to the `.jPanelMenu-panel` appropriately.
- Updated key press preventers to include typing within a `<select>` field.
- Fixed event propagation up to the document.
- Fixed an issue causing links under the menu button to be triggered inadvertently.
- Fixed an issue with loop styles and the Ember.js framework.

###<a href="#changelog-1.3.0" id="changelog-1.3.0">1.3.0</a>

February 4th, 2013

- Added [`closeOnContentClick`](#options-closeOnContentClick) option.

###<a href="#changelog-1.2.0" id="changelog-1.2.0">1.2.0</a>

February 3rd, 2013

- Added new callback options: [`beforeOn`](#options-beforeOn), [`afterOn`](#options-afterOn), [`beforeOff`](#options-beforeOff), [`afterOff`](#options-afterOff)

###<a href="#changelog-1.1.1" id="changelog-1.1.1">1.1.1</a>

February 3rd, 2013

- Fixed a conflict between [keyboard shortcuts](#options-keyboardShortcuts) and text inputs. (Thanks to [stoeffel](https://github.com/stoeffel).)
- Renamed JavaScript resources to be more friendly for future development.

###<a href="#changelog-1.1.0" id="changelog-1.1.0">1.1.0</a>

December 7th, 2012

- Added [directional control](#options-direction). Panel can now slide left or right.
- Removed unnecessary trigger check condition. (Thanks to [James Wilson](https://twitter.com/jimmynotjim)!)

###<a href="#changelog-1.0.0" id="changelog-1.0.0">1.0.0</a>

November 4th, 2012

- First release of jPanelMenu.


#<a href="#about" id="#about">Who Made This Wonderful Little Plugin?</a>

jPanelMenu was created, and is maintained, by [Anthony Colangelo](http://acolangelo.com).

You can find him ([@acolangelo](https://twitter.com/acolangelo)) on [Twitter](https://twitter.com/acolangelo) and [Github](https://github.com/acolangelo).

Have a question about how jPanelMenu works that is not answered here? Have feedback for new features, options, or API functions that I should add? Anything else you want to talk about?

Talk to me on [Twitter](https://twitter.com/acolangelo), where I am [@acolangelo](https://twitter.com/acolangelo), and let&rsquo;s talk!
