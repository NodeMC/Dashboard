/* ==========================================================================
   Main NodeMC Dashboard JavaScript Functions
   ========================================================================== */
/**
 * Captilized first-letter functions are only called within
 * this script.
 * Lowercase first-letter functions are called globally.
 */
var online = false,
    ip = undefined,
    apikey = undefined,
    serverinfo = undefined;
ServerInfo();

// Fetch log
setInterval(function(){ 
// Probably more effecient way of doing this
// Fetch console log
    fetch('http://nodemc.space:3350/log')
    .then((response) => response.text())
    .then((responseText) => {
        $("#console").val(responseText);
    });
}, 500);
// ---

// Get server stats
function ServerInfo(){
    fetch('http://nodemc.space:3350/info')
    .then((response) => response.text())
    .then((responseText) => {
        serverinfo = JSON.parse(responseText);
        $("#ip").html(serverinfo[4] + ":" + serverinfo[1]);
        $("#online").html(serverinfo[2] + "");
    })
    .catch((error) => {
        console.warn(error);
    });
}

function setApiKey(newkey){
    apikey = newkey;
    return apikey;
}