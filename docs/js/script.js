var jPanelMenu = {};
(function($){
	$(function() {
		$('pre').each(function(i, e) {hljs.highlightBlock(e)});
		
		jPanelMenu = $.jPanelMenu({
			menu: 'header.main nav'
		});
		jPanelMenu.on();

		$(document).on('click',jPanelMenu.menu + ' li a',function(e){
			if ( jPanelMenu.isOpen() && $(e.target).attr('href').substring(0,1) == '#' ) { jPanelMenu.close(); }
		});

		$(document).on('click','#trigger-off',function(e){
			jPanelMenu.off();
			$('html').css('padding-top','40px');
			$('#trigger-on').remove();
			$('body').append('<a href="" title="Re-Enable jPanelMenu" id="trigger-on">Re-Enable jPanelMenu</a>');
			e.preventDefault();
		});

		$(document).on('click','#trigger-on',function(e){
			jPanelMenu.on();
			$('html').css('padding-top',0);
			$('#trigger-on').remove();
			e.preventDefault();
		});
	});
})(jQuery);
