$(document).ready(function () {      
    jqReady = true;
    whenAllReady();
    function init_template(){//Class is vital to run AJAX Pages    
        //Sidebar Settings

        //page_get('calendar_entries.html');
        //page_get('calendar.html');
        //page_get('search_entries.html');
        //page_get('view_entry.html');
        //page_get('edit_entry.html');
        //page_get('manage_indexes.html');
        //page_get('edit_index.html');
        $(window).on('hashchange', function(){ init_page_load();}); //when hash change
        init_page_load(); //on page load

        //load the linked page
        function init_page_load(){
            let loc_hash = document.location.hash;
            if(loc_hash){
                let [page_name_with,param_string] = loc_hash.split('?');
                let page_name = page_name_with.substring(1); //skip #
                let params = get_params(param_string); 
                page_get(page_name+'.html');
            } else {
                page_get('calendar_entries.html');
            }
            //TODO : menu close??
        }

        /* $('a').on('click',function(e){
            let url_hash = new URL($(this).prop('href')).hash;
            if(url_hash){
                e.stopPropagation();
                e.preventDefault();
                let [page_name_with,param_string] = url_hash.split('?');
                let page_name = page_name_with.substring(1); //skip #
                let params = get_params(param_string); 
                $('.close-sidebar').trigger('click');
                page_get(page_name+'.html');
            }
        }); */

        function get_params(param_string){
            let rtn = {};
            if(! param_string) return rtn;
            split_params = param_string.split('&');
            $.each(split_params, function(index,item){
                let [key, value] = item.split('=');
                rtn[key] = value;
            });
            return rtn;
        }

        $('.show-left-sidebar').on('click', function(){
            $('.sidebar-left #sidebar-left-title').text(new Date().toLocaleDateString("en-us", { day: 'numeric', month: 'long', year: 'numeric' }));
            $('.sidebar-scroll-left').toggleClass('perspective-left'); 
            $('.sidebar-left').toggleClass('perspective-2-left'); 
            $('.page-content, .header, .footer-menu, .material-menu').toggleClass('perspective-3-left');   
            $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
        });  

        $('.show-right-sidebar').on('click', function(){        
            $('.sidebar-scroll-right').toggleClass('perspective-right'); 
            $('.sidebar-right').toggleClass('perspective-2-right'); 
            $('.page-content, .header, .footer-menu, .material-menu').toggleClass('perspective-3-right'); 
            $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
        });    

        $('.close-sidebar, #page-content').not('.show-submenu').on('click', function(){      
            $('.sidebar-scroll-left').removeClass('perspective-left'); 
            $('.sidebar-left').removeClass('perspective-2-left'); 
            $('.page-content, .header').removeClass('perspective-3-left');
            $('.sidebar-scroll-right').removeClass('perspective-right'); 
            $('.sidebar-right').removeClass('perspective-2-right'); 
            $('.page-content, .header').removeClass('perspective-3-right'); 
        });
        
        var submenu_items =  $('.submenu-active').parent().find('.submenu a').length
        $('.submenu-active').toggleClass('submenu-active submenu-active-'+submenu_items);
        
        $('.show-submenu').on('click', function(){
           var submenu_items =  $(this).parent().find('.submenu a').length
           $(this).parent().find('.submenu').toggleClass('submenu-active submenu-active-'+submenu_items); 
           $(this).toggleClass('submenu-active');     
           return false;  
        });

        //Header Settings
        /* $('.show-header-menu, .close-header-menu').on('click', function(){
           $('.header-menu').toggleClass('header-menu-active'); 
           $('.header-menu-overlay').show();
           $('.show-header-menu').toggleClass('header-rotate');
        });
        $('.header-menu a').on('click', function(){
           $('.header-menu-overlay').hide();
           $('.header-menu').removeClass('header-menu-active'); 
           $('.show-header-menu').toggleClass('header-rotate');
        });    
        $('.close-header-menu, .header-menu-overlay').on('click', function(){
           $('.header-menu-overlay').hide();
           $('.header-menu').removeClass('header-menu-active'); 
           $('.show-header-menu').toggleClass('header-rotate');
        }); */

        //Material Menu Settings//
        $('.material-menu-deploy').on('click', function(){
           $('.material-menu-background').addClass('mm-bg');
           $('.material-menu-deploy').css('z-index', '99'); 
           $(this).parent().find('.material-menu-close').addClass('mm-c');
           $(this).parent().find('.material-menu-1').addClass('mm-1');
           $(this).parent().find('.material-menu-2').addClass('mm-2');
           $(this).parent().find('.material-menu-3').addClass('mm-3');
           $(this).parent().find('.material-menu-4').addClass('mm-4');
           $(this).parent().find('.material-menu-5').addClass('mm-5');
           $(this).parent().find('.material-menu-6').addClass('mm-6');
        });    

        $('.material-menu-close, .material-menu-background, .mm').on('click', function(){
            $('.material-menu-background').removeClass('mm-bg');
            setTimeout(function(){
                $('.material-menu-deploy').css('z-index', '999');  
            }, 350);
            $(this).parent().find('.material-menu-close').removeClass('mm-c');
            $(this).parent().find('.material-menu-6').removeClass('mm-6');
            $(this).parent().find('.material-menu-5').removeClass('mm-5');
            $(this).parent().find('.material-menu-4').removeClass('mm-4');
            $(this).parent().find('.material-menu-3').removeClass('mm-3');
            $(this).parent().find('.material-menu-2').removeClass('mm-2');
            $(this).parent().find('.material-menu-1').removeClass('mm-1');
        });

        //Modal Menu*/
        $('.show-modal-menu, .close-modal-menu, .modal-menu-background, .modal-menu a').on('click', function(){
           $('.modal-menu').toggleClass('active-modal-menu');
           $('.modal-menu-background').toggleClass('active-modal-menu-background');
           $('.show-modal-menu').toggleClass('rotate-45');
        });

        //Preload Image
        /* $(function() {
            $(".preload-image").lazyload({
                threshold : 100,
                effect : "fadeIn",
                container: $("#page-content-scroll")
            });
        }); */

        //Mobile Style Switches
        $('.switch-1').on('click', function(){$(this).toggleClass('switch-1-on'); return false;});
        $('.switch-2').on('click', function(){$(this).toggleClass('switch-2-on'); return false;});
        $('.switch-3').on('click', function(){$(this).toggleClass('switch-3-on'); return false;});
        $('.switch, .switch-icon').on('click', function(){
            $(this).parent().find('.switch-box-content').slideToggle(250); 
            $(this).parent().find('.switch-box-subtitle').slideToggle(250);
            return false;
        });

        //Classic Toggles
        $('.toggle-title').on('click', function(){
            $(this).parent().find('.toggle-content').slideToggle(250); 
            $(this).find('i').toggleClass('rotate-toggle');
            return false;
        });

        //Accordion
        $('.accordion').find('.accordion-toggle').on('click', function(){
            //Expand or collapse this panel
            $(this).next().slideDown(250);
            $('.accordion').find('i').removeClass('rotate-180');
            $(this).find('i').addClass('rotate-180');

            //Hide the other panels
            $(".accordion-content").not($(this).next()).slideUp(250);
        });    

        //Tabs
        $('ul.tabs li').on('click', function(){
            var tab_id = $(this).attr('data-tab');
            $('ul.tabs li').removeClass('active-tab');
            $('.tab-content').slideUp(250);
            $(this).addClass('active-tab');
            $("#"+tab_id).slideToggle(250);
        })

        //Notifications
        $('.static-notification-close').on('click', function(){
           $(this).parent().slideUp(250); 
            return false;
        });    
        $('.tap-dismiss').on('click', function(){
           $(this).slideUp(250); 
            return false;
        });

        //Detect if iOS WebApp Engaged and permit navigation without deploying Safari
        (function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

        //Detecting Mobiles//
        var isMobile = {
            Android: function() {return navigator.userAgent.match(/Android/i);},
            BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
            iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
            Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
            Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
            any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
        };

        if( !isMobile.any() ){
            $('.show-blackberry, .show-ios, .show-windows, .show-android').addClass('disabled');
            $('#page-content-scroll').css('right', '0px');
            $('.show-no-detection').removeClass('disabled');
        }
        if(isMobile.Android()) {
            //Status Bar Color for Android
            $('head').append('<meta name="theme-color" content="#000000"> />');
            $('.show-android').removeClass('disabled');
            $('.show-blackberry, .show-ios, .show-windows').addClass('disabled');
            $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
        }
        if(isMobile.BlackBerry()) {
            $('.show-blackberry').removeClass('disabled');
            $('.show-android, .show-ios, .show-windows').addClass('disabled');
            $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
        }   
        if(isMobile.iOS()) {
            $('.show-ios').removeClass('disabled');
            $('.show-blackberry, .show-android, .show-windows').addClass('disabled');
            $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
        }
        if(isMobile.Windows()) {
            $('.show-windows').removeClass('disabled');
            $('.show-blackberry, .show-ios, .show-android').addClass('disabled');
            $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
        }

        //Show Back To Home When Scrolling
        $('#page-content-scroll').on('scroll', function () {
            var total_scroll_height = $('#page-content-scroll')[0].scrollHeight
            var inside_header = ($(this).scrollTop() <= 200);
            var passed_header = ($(this).scrollTop() >= 0); //250
            var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() +100 )));

            if (inside_header == true) {
                $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
            } else if (passed_header == true)  {
                $('.back-to-top-badge').addClass('back-to-top-badge-visible');
            } 
            if (footer_reached == true){            
                //$('.back-to-top-badge').removeClass('back-to-top-badge-visible');
            }
        });

        //Back to top Badge
        $('.back-to-top-badge, .back-to-top').on('click', function (e) {
            e.preventDefault();
            $('#page-content-scroll').animate({
                scrollTop: 0
            }, 250);
        });  
    }//Init Template Function

    
    setTimeout(init_template, 0);//Activating all the plugins
    

    $('#page-content, .landing-page').addClass('fadeIn show-containers');
    
});