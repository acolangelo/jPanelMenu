#1.4.1

###November 11th, 2014

- [ADDED] `touchend` listeners for better touch support.

#1.4.0

###November 11th, 2014

- [ADDED] [`panel`](#options-panel) option.
- [ADDED] [`clone`](#options-clone) option.
- [ADDED] [`setPosition(&nbsp;)`](#api-setPosition) API method.
- [REMOVED] Support for fixed positioning within the panel. CSS transforms and fixed positioning [do not get along well, per the spec](http://meyerweb.com/eric/thoughts/2011/09/12/un-fixing-fixed-elements-with-css-transforms/). If fixed positioning is needed, use [the legacy build](https://github.com/acolangelo/jPanelMenu/blob/master/jquery.jpanelmenu-legacy.js) in the jPanelMenu repository.
- [UPDATED] `.jPanelMenu-panel` to be positioned statically.
- [UPDATED] Background handling so that all properties are transferred to the `.jPanelMenu-panel` appropriately.
- [UPDATED] Key press preventers to include typing within a `<select>` field.
- [FIXED] Event propagation up to the document.
- [FIXED] An issue causing links under the menu button to be triggered inadvertently.
- [FIXED] An issue with loop styles and the Ember.js framework.

#1.3.0

###February 4th, 2013

- [ADDED] [`closeOnContentClick`](#options-closeOnContentClick) option.

#1.2.0

###February 3rd, 2013

- [ADDED] New callback options: [`beforeOn`](#options-beforeOn), [`afterOn`](#options-afterOn), [`beforeOff`](#options-beforeOff), [`afterOff`](#options-afterOff)

#1.1.1

###February 3rd, 2013

- [FIXED] A conflict between [keyboard shortcuts](#options-keyboardShortcuts) and text inputs. (Thanks to [stoeffel](https://github.com/stoeffel).)
- Renamed JavaScript resources to be more friendly for future development.

#1.1.0

###December 7th, 2012

- [ADDED] [Directional control](#options-direction). Panel can now slide left or right.
- [REMOVED] Unnecessary trigger check condition. (Thanks to [James Wilson](https://twitter.com/jimmynotjim)!)

#1.0.0

###November 4th, 2012

- First release of jPanelMenu.
