/*
 * These values and functions are being used by throughout the Diex app
 * Can not use JQuery o Cordova functions or code here.
 */


var browserView = true;
var global_db = null;
var page_name = '';
var page_params = null;

function set_key(key, value){
    let storage = window.localStorage;
    storage.setItem(key, value) ;
    return true;
}

function get_key(key){
    let storage = window.localStorage;
    return storage.getItem(key) ;
}

function remove_key(key){
    let storage = window.localStorage;
    storage.removeItem(key) ;
    return true;
}

function console_log(...args){
    if(browserView) {
        console.log(args); 
    } else {
        alert(args);
    }
}

function close_app(){
    if (navigator.app) {
        navigator.app.exitApp();
    } else if (navigator.device) {
        navigator.device.exitApp();
    } else {
        window.close();
    }
}