// @codekit-prepend lib/modernizr-2.6.1.min.js
// @codekit-prepend lib/respond.js
// @codekit-prepend lib/jRespond.js
// @codekit-prepend lib/highlight.min.js
// @codekit-prepend lib/jquery-1.9.0.js
// @codekit-prepend lib/jquery.jpanelmenu.min.js
// @codekit-prepend lib/plugins.js

var jPanelMenu = {};
$(function() {
	$('pre').each(function(i, e) {hljs.highlightBlock(e)});

	jPanelMenu = $.jPanelMenu({
		menu: 'header.main nav'
	});

	var jR = jRespond([
		{
			label: 'small',
			enter: 0,
			exit: 800
		},{
			label: 'large',
			enter: 800,
			exit: 10000
		}
	]);

	jR.addFunc({
		breakpoint: 'small',
		enter: function() {
			jPanelMenu.on();
			$(document).on('click',jPanelMenu.menu + ' li a',function(e){
				if ( jPanelMenu.isOpen() && $(e.target).attr('href').substring(0,1) == '#' ) { jPanelMenu.close(); }
			});
		},
		exit: function() {
			jPanelMenu.off();
			$(document).off('click',jPanelMenu.menu + ' li a');
		}
	});
});