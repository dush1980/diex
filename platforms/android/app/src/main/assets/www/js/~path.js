function page_get(page){
    //console.log('get page -->', page);
    $('.page-preloader').show();
    var xhr= new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) {
            $('#page-content-scroll').html('<b>Page '+page+' not found<b>');
        } else if (this.status!==200) {
            $('#page-content-scroll').html('<b>Page '+page+' not found<b>');
        } else {
            if(typeof beforepageunload === 'function') beforepageunload(); // unload func on previosue page

            //document.getElementById('testload').innerHTML= this.responseText;
            $('#page-content-scroll').html(this.responseText);

            if(typeof afterpageload === 'function') afterpageload(); // load function on current page
        }
        $('.page-preloader').hide();
        
    };
    xhr.send();
}

$(window).on('hashchange', function(){ //when hash change
    //alert('change path'); 
}); 

//load the linked page
function page_load(loc_path){    
    let loc_hash = new URL(loc_path).hash
    //document.location.hash;
    if(loc_hash){
        let [page_name_with,param_string] = loc_hash.split('?');
        let page_name = page_name_with.substring(1); //skip #
        let params = get_params(param_string); 
        page_get(page_name+'.html');
    } else {
        page_get('calendar_entries.html');
    }
}

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

/* function load_pages(){
    $('.page').each(function(index, page){
        console.log('index', index, 'page', page);
        let page_name = $(page).data('name');
        var xhr= new XMLHttpRequest();
        xhr.open('GET', page_name + '.html', true);
        xhr.onreadystatechange= function() {
            if (this.readyState!==4) {
                $(page).html('<b>Page '+page_name+' not found<b>');
            } else if (this.status!==200) {
                $(page).html('<b>Page '+page_name+' not found<b>');
            } else {
                //document.getElementById('testload').innerHTML= this.responseText;
                $(page).html(this.responseText);
            }
        };
        xhr.send();
    });
    init_setup();
} */