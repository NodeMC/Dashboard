/**
* React components for rendering items on page.
*
* @author  Gabriel Simmer
* @version 1.0
*/

// General Variables
var online = "true";

/* ==============================
 * Header
 * ==============================
 */
var HeaderContent = React.createClass({
    render: function(){
        return (
            <div>
            <h1>NodeMC v6 <small>Server IP: <span id="ip"></span> Online? <span id="online"></span></small></h1>
            </div>
        );
    }
});
// ==============================

/* ==============================
 * Index page components
 * ==============================
 */
var IndexContents = React.createClass({
    // Render all components in correct order
    render: function(){
        // ApiInput is temporary
        return (
            <div>
                <ApiInput />
                <ConsoleBox />
                <CommandInput />
            </div>
        );
    }
})
var ConsoleBox = React.createClass({
    // Server log output
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
    // Server command input
    render: function(){
        return (
            <div>
                <input type="text" id="command" className="u-full-width" placeholder="command"></input>
            </div>
        );
    }
});
// ==============================

/* ==============================
 * Settings page components
 * ==============================
 */
var SettingsContents = React.createClass({
    render: function(){
        return(
            <ApiInput />
        )
    }
});
var ApiInput = React.createClass({
    // API key input
    handleClick: function() {
        var tmp = $("#apikey").val();
        setApiKey(tmp);
    },
    render: function(){
        return(
        <div>
            <input type="text" id="apikey" className="e-input-apikey" placeholder="apikey"></input>
            <button className="e-button-apikey" onClick={this.handleClick}>Set</button>
        </div>
        )
    }
});
// ==============================

/* ==============================
 * Main page renderes
 * ==============================
 */

// Render header no matter the page
ReactDOM.render(
    <HeaderContent />,
    document.getElementById('header')
);

// Render index content if on index.html
if(location.pathname == "/" 
    || location.pathname == "/index/"
    || location.pathname == "/index.html"){
    ReactDOM.render(
        <IndexContents />,
        document.getElementById('content')
    );
}

// Render settings content if on settings.html
if(location.pathname == "/settings"
    || location.pathname == "/settings.html"){
    ReactDOM.render(
        <SettingsContents />,
        document.getElementById('content')
    );
}

// ==============================