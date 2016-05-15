// General Variables
var online = "Yes", 
    ip = "127.0.0.1:25565";

/*var UserInfo = React.createClass({
    getInitialState: function(){
        return {
            apikey = apikey
        };
    };
});*/

// Fetch log
setInterval(function(){ // Probably more effecient way of doing this
    fetch('http://nodemc.space:3350/log')
    .then((response) => response.text())
    .then((responseText) => {
        $("#console").val(responseText);
    });
}, 500);
// ---
