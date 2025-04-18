/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
let deviceReady = false;
let jqReady = false;
let dbReady = false;

document.addEventListener('deviceready', onDeviceReady, false);

if (browserView) { //cordova device ready event won't fire for browser
    console.log('this is broswer'); 
    onDeviceReady(); 
}

function onDeviceReady() {
    // when Cordova is ready
    deviceReady = true;
    whenAllReady();
    init_db(); //call DB to init
    //console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
}

$(document).ready(function () { 
    //when JQuery is ready     
    jqReady = true;
    whenAllReady();
});

var timeoutID = setTimeout(function(){
    if (!deviceReady || !jqReady || !dbReady){
        console.log('something wrong, can not login. show warning and exit');
    } else {
        console.log('all good');
    }
}, 5000);

function whenAllReady(){
    console.log('Device Ready : ',deviceReady, 'JQ Ready : ', jqReady, 'DB Ready : ', dbReady);
    if(deviceReady && jqReady && dbReady) {
        clearTimeout(timeoutID);
        init_setup();
    }
}


