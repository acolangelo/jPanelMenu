#jPanelMenu

jPanelMenu is a [jQuery](http://jquery.com) plugin that creates a paneled-style menu (like the type seen in the mobile versions of [Facebook](http://m.facebook.com) and [Google](http://google.com), as well as in many native iPhone applications).



#How Do I Use This Thing?

Start off by including the jPanelMenu.js file in your page. (Bonus points for using the minified version [jPanelMenu.min.js], or for bundling the jPanelMenu code into your own JavaScript file to reduce size and HTTP requests.)

Build your page as you normally would (the source order does not matter), and instantiate jPanelMenu by calling the plugin constructor function.

	var jPM = $.jPanelMenu();

By default, jPanelMenu will look for an element with an ID of `menu` to use as the menu, and elements with a class of `menu-trigger` to use as the trigger(s). To point jPanelMenu to your menu and trigger elements, pass an object into the constructor function call, as follows:

	var jPM = $.jPanelMenu({
		menu: '#custom-menu-selector',
		trigger: '.custom-menu-trigger-selector'
	});

**Note:** Check out the [options section](#options) for more customization goodness like the above.

After jPanelMenu has been instantiated (and made sure to save the returned object to a variable, as shown above), it's time to turn it on!

	jPM.on();

After that, jPanelMenu will be functioning, and that's it!

If you want to take things to the next level, keep reading.



#How Does This Thing Work?

When jPanelMenu is turned on, two `<div>` elements are created. The menu element (with an id of `jPanelMenu-menu`, and the panel element (with a class of `jPanelMenu-panel`).

The menu, `#jPanelMenu-menu`, contains the elements targeted by the menu selector passed into the jPanelMenu constructor function. The targeted menu element is cloned into `#jPanelMenu-menu`, and is not removed from its original position in the DOM, it is only hidden (using `display: none`).

The panel, `.jPanelMenu-panel`, contains all of the content in the `<body>` element (except for `<style>` tags and `#jPanelMenu-menu`). The selected content is moved, not cloned, into `.jPanelMenu-panel`.

To style or select the menu, use the following selector: `#jPanelMenu-menu`.

To style or select the content panel, use the following selector: `.jPanelMenu-panel`.

When jPanelMenu is turned off, the two `<div>` elements are removed, and all of the content inside `.jPanelMenu-panel` is moved back into the `<body>` element. 



#Options

The following options can be set via an object passed into the constructor function call.

	var jPM = $.jPanelMenu({
		// options...
	});


***


###menu

The selector pointing to the desired menu element.

- **Data Type:** `string`
- **Default Value:** `#menu`


***


###trigger

The selector pointing to the menu-triggering element.

- **Data Type:** `string`
- **Default Value:** `.menu-trigger`


***


###keyboardShortcuts

A boolean value specifiying whether or not keyboard shortcuts for opening and closing the menu are active.

**ADD KEYBOARD SHORTCUTS**

- **Data Type:** `boolean`
- **Accepted Values:** `true`, `false`
- **Default Value:** `true`


***


###openPosition

The measurement value for the open position of the menu. Can be set as a pixel, percentage, or em value.

- **Data Type:** `string`
- **Examples:** `250px`, `75%`, `20em`
- **Default Value:** `250px`


***


###duration

The time, in milliseconds, which it should take to open and close the menu, when animated.

- **Data Type:** `int`
- **Default Value:** `150`


***


###openDuration

The time, in milliseconds, which it should take to open the menu, when animated. If set, this overrides the duration option.

- **Data Type:** `int`
- **Default Value:** Inherited from `duration`


***


###closeDuration

The time, in milliseconds, which it should take to close the menu, when animated. If set, this overrides the duration option.

- **Data Type:** `int`
- **Default Value:** Inherited from `duration`


***


###easing

The easing function to use when animating the opening and closing of the menu.

- **Data Type:** `string`
- **Accepted Values:** `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`
- **Default Value:** `ease-in-out`


***


###openEasing

The easing function to use when animating the opening of the menu. If set, this overrides the easing option.

- **Data Type:** `string`
- **Accepted Values:** `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`
- **Default Value:** Inherited from `easing`


***


###closeEasing

The easing function to use when animating the closing of the menu. If set, this overrides the easing option.

- **Data Type:** `string`
- **Accepted Values:** `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`
- **Default Value:** Inherited from `easing`


***


###before

Called before the menu is opened or closed, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`


***


###beforeOpen

Called before the menu is opened, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`


***


###beforeClose

Called before the menu is closed, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`


***


###after

Called after the menu is opened or closed, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`


***


###afterOpen

Called after the menu is opened, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`


***


###afterClose

Called after the menu is closed, regardless of animation state.

- **Data Type:** `function`
- **Default Value:** `function(){ }`



#API

The following are the methods and properties of the object returned by the jPanelMenu constructor function call.

###Example
	var obj = $.jPanelMenu({ /* options */ });

###Methods

	on (function)
	Initializes a jPanelMenu instance. Sets up the markup, styles, listeners, and interactions, according to the options passed into the constructor function.

	* * * * * * * * * * * * * * * * * * * * * * * * *
	
	off (function)
	Destroys a jPanelMenu instance. Resets the markup and styles, removes listeners and interactions.

###Properties

#Best Practices

###Progressive Enhancement

Users without JavaScript (whether they have turned it off or are using a device without it) will obviously not get the interactions provided by jPanelMenu. It's a good idea to take a "progressive enhancement" approach, and build your site's navigation to work without JavaScript running.

A good way to do that is to have your site's basic CSS display and style the navigation (or whatever is the content of your jPanelMenu) in an appropriate way, and use JavaScript to apply any styles that are specific to the JavaScript-enabled implementation.













