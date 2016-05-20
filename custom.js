/* -----------------------------------------------------------------------


 Custom Javascript - Thurman Law Firm
 Author: Sean K. Stewart
 URL: www.seankstewart.com

----------------------------------------------------------------------- */

	stLight.options({publisher:'d1be406e-430f-42f7-a36d-55786a61c6bf', onhover:false});

	//jQuery.noConflict();	
	jQuery(document).ready(function($) {
			
		$('#mainnav li a').click(function() {
			if ($(this)[0].href == "") {
				$(this).next('ul').slideToggle('slow');
			}	
		});	
		if ($('#mainnav li.current-menu-ancestor').length > 0) {
			$('#mainnav li.current-menu-ancestor').children('ul.sub-menu').show();				
		}	
		
		$.each($('#mainnav li a'), function() {
			//alert($(this).html());
			if ( $(this).html() == 'Connect') {				
				$(this).addClass('clearfix').wrapInner('<span />').append('<span class="connect_icons"><a href="http://www.facebook.com/pages/Thurman-Law-Firm/149965848412220" class="socialicon facebook">Facebook</a><!--a href="#twitter" class="socialicon twitter">Twitter</a--></span>');
				$('a.facebook, a.twitter').hover(function() {
						$(this).css({ opacity: 0.75 });
					}, function() {
						$(this).css({ opacity: 1 });
					}
				);
			} else if ( $(this).html() == 'Share') {
				$(this).addClass('clearfix').wrapInner('<span />').append("<span class='st_sharethis'><span class='socialicon'><img src='' /></span></span>");
				$(this).hover(function() {
						$('.chicklets').css({ opacity: 0.75 });
					}, function() {
						$('.chicklets').css({ opacity: 1 });
					}
				);
			}
		});	
		
		
		
		$('.next, .prev').hide();
		var timer;
		function showSliderNav() {
			window.clearTimeout(timer);
			
				$("#slidernav").animate({
					opacity: 1,
					bottom: '0'
					}, 'fast', function() {
						
				});
				$('.next, .prev').fadeIn('slow');
			
		}
		function hideSliderNav() {
			timer = setTimeout(function() {
				$('.next, .prev').hide();
				$("#slidernav").animate({
					opacity: 1,
					bottom: '-96px'
					}, 500
				);
			}, 8000);
		}

		if ($("#slidernav li a").length > 1) {
			showSliderNav();
		}		
		
		
		$('#masthead').mouseover(function() {
			showSliderNav();
			$(this).addClass('pagination_open');
			$(this).each(function() { clearInterval($(this).data("interval")); });			
		});
		$('#masthead').mouseleave(function() {
			hideSliderNav();
			$('#masthead .pagination li.current a').click();
			$(this).removeClass('pagination_open');						
		});
		
		var item_width = $('#slidernav li').outerWidth();
		
		var itemLeft = 0;
		$("#slidernav li a").each(function(el){
			itemLeft = itemLeft+$(this).width();
			$('#slidernav ul').width(itemLeft * 2);
		});
		var left = 0;
		var displayNum = 6;
		var navLeft = 0;			
		var inc = ($("#slidernav li a:first").width() + 40) * displayNum;	// width of thumb slide animation (width+padding/margin/borders * number of slides to move per click)
		var counter = 1;
		var clickTotal = Math.ceil($("#slidernav li a").size()/displayNum);
		var totalItems = $(".pagination li a").length;
		left = 0;
		
		if (totalItems <= displayNum) $('.prev').css({'z-index':displayNum});
		
		$('.next').css({'z-index':displayNum});
		
		$(".prev").click(function(){
			//$('.next').fadeIn('slow');
			$('.next').css({'z-index':totalItems});
							
			left = left+inc;				
			$("#slidernav ul").animate({
				marginLeft: "-"+(left)+"px"
			  }, 500,'swing', function() {
				counter++;
				if(counter >= clickTotal) {
					$('.prev').css({'z-index':displayNum});
				}
			  });				
			return false;
		});
		$(".next").click(function(){
			$('.prev').css({'z-index':totalItems});
			
			left = left-inc;
			$("#slidernav ul").animate({
				marginLeft: "-"+(left)+"px"
			}, 500,'swing', function() {					
				counter--;
				if(counter == 1){
					$('.next').css({'z-index':displayNum});
				}
			});
			return false;
		});



		$("#masthead").slides({
			preload: true,
			//preloadImage: '../img/loading.gif',
			play: 5000,
			pause: 2500,
			slideSpeed: 300,
			effect: 'fade, fade',
			hoverPause: true,
			prev:'slider_prev',
			next:'slider_next',
			generateNextPrev: false,
			generatePagination: false,
			paginationClass: 'pagination',
			animationStart: function(current) {
				
				
				if ($('#masthead').attr('class') != 'pagination_open' && $(".pagination li:nth-child("+displayNum+"n)").hasClass('current') || $(".pagination li:nth-child("+totalItems+")").hasClass('current')) {
					//alert(counter + "\n" + clickTotal)
					if (counter != clickTotal && (counter+1 != Math.ceil(totalItems/current) || counter-1 != Math.ceil(totalItems/current))) {
					
						$('.next').css({'z-index':totalItems});
						if (totalItems == current) {
							left = 0;
							counter = 1;
							$('.next').css({'z-index':displayNum});
						} else if (counter == Math.ceil((current/counter) - 1)) {
							left = left+inc; 
							counter++;								
						} else {
							left = left+inc; 
							$("#slidernav ul").animate({
								marginLeft: "-"+(left)+"px"
							  }, 500,'swing', function() {
								counter++;
								if (counter >= clickTotal) {
									$('.prev').css({'z-index':displayNum});
								}	

							  });
						}	  
						
					} else if (totalItems == current) {
						$('.prev').css({'z-index':totalItems});
												
						left = 0;
						$("#slidernav ul").animate({
							marginLeft: "-"+(left)+"px"
						  }, 500,'swing', function() {
							counter = 1;

								$('.next').css({'z-index':displayNum});

						  });							
					}
				}
			},
			animationComplete: function(current) {
				if ($('#masthead').hasClass('pagination_open')) {
					$('#masthead').each(function() { clearInterval($(this).data("interval")); });					
				}	
			}
						
			
		});		
		
	});