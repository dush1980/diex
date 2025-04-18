function get_file(fname, get_file_callback, ...args){
    //console.log('get page -->', fname);   
    var xhr= new XMLHttpRequest();
    xhr.open('GET', fname, true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) {
            get_file_callback(false, '<b>File '+fname+' not found<b>', args);
        } else if (this.status!==200) {
            get_file_callback(false, '<b>File '+fname+' not found<b>', args);
        } else {
            get_file_callback(true, this.responseText, args);
        }
    };
    xhr.send();
}

//load the linked page
function get_page(loc_path){ 
    let loc_hash = new URL(loc_path).hash
    
    //document.location.hash;
    if(loc_hash){
        let [page_name_with,param_string] = loc_hash.split('?');
        page_name = page_name_with.substring(1); //skip #
        page_params = get_params(param_string); 
        get_file(page_name+'.html', load_page_callback);
    } else {
        get_file('calendar_entries.html', load_page_callback);
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

$(window).on('hashchange', function(){ //when hash change
    //alert('change path'); 
    load_page();
});

function load_page(){
    $('.page-preloader').show();
    if(typeof beforepageunload === 'function') beforepageunload(); // unload func on previosue page
    get_page(document.location);
}

function load_page_callback(page_load_success, page_body, ...args){
    $('#page-content-scroll').html(page_body);
    if(typeof afterpageload === 'function') afterpageload(); // load function on current page
    $('.page-preloader').hide();
}

var Mustache = require('mustache');
    var view = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  }
};
//var x = new mustache();
var output = mustache.render("{{title}} spends {{calc}}", view);

console.log(output);
