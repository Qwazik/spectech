var md = new MobileDetect(window.navigator.userAgent);
$(function() {
	$('.fancybox-photo').fancybox({
		image: {
			protect: true
		}
	});
	// ========== init script =============
	$('.responsive-button').click(function(){
		var menu = $('.page__menu');
		if(menu.is('.open')){
			close();
		}else{
			open();
		}
		var ml = $(menu).css('margin-left');

		function close(){
			$(menu).css('margin-left',ml);
			$('.main-header .social').show();
			$(menu).stop(true,true).animate({
				left: -$(menu).width()+50 + 'px'
			},150, function(){
				$(menu).removeClass('open');
				$('.page__menu').mCustomScrollbar('scrollTo', 0)
			})
		}

		function open(){

			$('.main-header .social').hide();
			$(menu).stop(true,true).animate({
				left: 0
			},150, function(){
				$(menu).addClass('open');
			})
			$(menu).css('margin-left',0);
		}
	});

	if(md.mobile()===null){
		$('.scrollbar').mCustomScrollbar({
			scrollInertia: 300,
			callbacks: {
				whileScrolling: function(e,a){
					if(this.mcs.top < -10){
						$('.menu-logo').removeClass('fadeOutUp');
						$('.menu-logo').addClass('fadeInDown');
						$('.menu-logo').css('display', 'block');
					}else{
						$('.menu-logo').css('display', 'none');

					}
				}
			}
		});
	}
	$('.scrollbar-menu').mCustomScrollbar({
		axis: 'y'
	});
	equalHeight('.home-services', '.home-services__item .text');
	equalHeight('.catalog', '.catalog__item');
	
	// ========== init script end =========
	$(window).resize(function(){
		equalHeight('.home-services', '.home-services__item .text');
		equalHeight('.tabs__content', '.col-33');
		equalHeight('.catalog', '.catalog__item');
	});
	// main slider
		(function(){
			var slider = $('#mainSliderJs');
			var nav = $('#mainSliderJs').siblings('.slide-navigation');
			


			var slider = slider.owlCarousel({
					items: 1
			});
		
			updateCurrent();
			nav.find('.numbers .col').text(slider.find('.main-slider__item').length);

			nav.find('.prev').click(function(){
				slider.trigger('prev.owl.carousel');
				updateCurrent();
				return false;
			});
			nav.find('.next').click(function(){
				slider.trigger('next.owl.carousel');
				updateCurrent();
				return false;
			});

			function updateCurrent(){
				var currentSlide = slider.find('.owl-dot.active').index() + 1;
				nav.find('.numbers .current').text(currentSlide);
			}
		}());

		//navigation
		(function(){
			var nav = $('#mainNavigation'),
				submenu1 = $('.submenu--lvl1'),
				submenu2 = $('.submenu--lvl2'),
				submenu1Position = nav.width(),
				submenu2Position = nav.width() * 2,
				timeoutDelay = 200,
				animationDuration = 150,
				openTimeout;
			$('.menu-section__body').children('li').mouseenter(function(e){						
				var el = this;
				clearTimeout(openTimeout);
				openTimeout = setTimeout(function(){
					openLvl1(el);
				}, timeoutDelay);
			});
			$('.menu-section__body').children('li').mouseleave(function(e){
				clearTimeout(openTimeout);
			});
			nav.find('ul ul').hide();
			
			$(document).mousemove(function(e){
				if($(e.target).closest('.page__menu-wrap').length === 0 && (submenu1.is('.open') || submenu2.is('.open'))){
					clearTimeout(openTimeout);
					closeAll();
				}

			});

			function openLvl1(el){
				var ul = $(el).children('ul').clone();
				var header = '<div class="submenu__name">'+$(el).children('a').text()+'</div>';
				nav.find('li').removeClass('active');
				$(el).addClass('active');
				console.log(header);
				console.log(ul)
				if(ul.length == 0){
					if(submenu1.is('.open')){
						closeAll();
					}
					return false;
				}
				submenu1.html('');
				submenu1.append(header);
				submenu1.append(ul);
				submenu1.stop(true,true).animate({
					left: submenu1Position + 'px'
				}, animationDuration, function(){
					$(submenu1).addClass('open');
				});
				var openTimeout;
				submenu1.find('li').mouseenter(function(e){
					var el = this;
					clearTimeout(openTimeout);
					openTimeout = setTimeout(function(){
						openLvl2(el);
					}, timeoutDelay);
				});
				submenu1.find('li').mouseleave(function(e){
					clearTimeout(openTimeout);
				});
			}
			function openLvl2(el){
				var ul = $(el).children('ul').clone();
				var header = '<div class="submenu__name">'+$(el).children('a').text()+'</div>';
				submenu1.find('li').removeClass('active');
				$(el).addClass('active');
				if(ul.length == 0){
					if(submenu2.is('.open')){
						closeSubmenu2();
					}
					return false;
				}
				submenu2.html('');
				submenu2.append(header);
				submenu2.append(ul);
				submenu2.stop(true).animate({
					left: submenu2Position + 'px'
				}, animationDuration, function(){
					submenu2.addClass('open');
				});
				
			}
			var closeProcess = true;
			function closeAll(){
				nav.find('li').removeClass('active');
				if(submenu1.is('.open') && closeProcess == true){
					closeProcess = false;
					submenu2.stop(true, true).animate({
						left: 0
					}, animationDuration, function(){
						submenu1.stop(true, true).animate({
							left: 0
						}, animationDuration/2, function(){
							submenu1.html('').removeClass('open');
							submenu2.html('').removeClass('open');
							closeProcess = true;
						});
					});
				}

			}
			function closeSubmenu2(){
				console.log('msg')
				if(submenu1.is('.open')){
					submenu2.stop(true,true).animate({
						left: 0
					}, animationDuration*2);
					submenu2.html('').removeClass('open'); 
				}
			}
		}());

		$('.tabs__nav li').click(function(){
			$(this).siblings('li').removeClass('active');
			$(this).addClass('active');
			$('.tabs__content').hide();
			$('.tabs__content').eq($(this).index()).fadeIn(100);
			equalHeight('.tabs__content', '.col-33');
			
			return false;
		});
});//ready

function equalHeight(wrap, element){
		$(wrap).each(function(){
				var maxHeight = [],
						className = element;
				$(this).find(className).each(function(){
						$(this).height('auto');
				});
				$(this).find(className).each(function(){
						maxHeight.push($(this).height());
				});
				maxHeight = Math.max.apply(null, maxHeight);
				$(this).find(className).each(function(){
						$(this).height(maxHeight);
				});
		});
}

function initMap(){

$('#mapTabs .tabs__nav li').click(function(){
	var index = $(this).index();
	var address = $('.mapMain').eq($(this).index()).data('address');
	$.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address, function(r){
	console.log('sdf');
		if(r['status'] == 'OK'){
			var coords = r['results']['0']['geometry']['location'];
			var currentMap = $('.mapMain').eq(index)[0];
			 	map = new google.maps.Map(currentMap, {
					center: coords,
					zoom: 17
				});
			}
			var marker = new google.maps.Marker({
		    position: coords,
		    map: map,
		    title: address
		  });
		});
	});
	$(window).load(function(){
		$('#mapTabs .tabs__nav li').eq(0).click();
	});
}

