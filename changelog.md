#1.4.1

###November 11th, 2014

- Added `touchend` listeners for better touch support.

#1.4.0

###November 11th, 2014

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

#1.3.0

###February 4th, 2013

- Added [`closeOnContentClick`](#options-closeOnContentClick) option.

#1.2.0

###February 3rd, 2013

- Added new callback options: [`beforeOn`](#options-beforeOn), [`afterOn`](#options-afterOn), [`beforeOff`](#options-beforeOff), [`afterOff`](#options-afterOff)

#1.1.1

###February 3rd, 2013

- Fixed a conflict between [keyboard shortcuts](#options-keyboardShortcuts) and text inputs. (Thanks to [stoeffel](https://github.com/stoeffel).)
- Renamed JavaScript resources to be more friendly for future development.

#1.1.0

###December 7th, 2012

- Added [directional control](#options-direction). Panel can now slide left or right.
- Removed unnecessary trigger check condition. (Thanks to [James Wilson](https://twitter.com/jimmynotjim)!)

#1.0.0

###November 4th, 2012

- First release of jPanelMenu.
