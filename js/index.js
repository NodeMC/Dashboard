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

fetch('http://nodemc.space:3350/log')
.then((response) => response.text())
.then((responseText) => {
  $("#console").val(responseText);
})
// ---
// Header
var HeaderContent = React.createClass({
    render: function(){
        return (
            <div>
            <h1>NodeMC v6 <small>Server IP: { ip } Online? { online }</small></h1>
            </div>
        );
    }
});
// ---
// Index page components
var IndexContents = React.createClass({
    render: function(){
        return (
            <div>
                <ConsoleBox />
                <CommandInput />
            </div>
        );
    }
})
var ConsoleBox = React.createClass({
    render: function(){
        return (
            <div>
                <h4>Console</h4>
                <textarea id="console" rows="32" className="e-log u-full-width" placeholder="Loading log..."></textarea>
            </div>
        );
    }
});
var CommandInput = React.createClass({
    render: function(){
        return (
            <div>
                <input type="text" id="command" className="u-full-width" placeholder="command"></input>
            </div>
        );
    }
});
// ---
ReactDOM.render(
    <HeaderContent />,
    document.getElementById('header')
);
ReactDOM.render(
    <IndexContents />,
    document.getElementById('content')
);