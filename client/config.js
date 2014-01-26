// client/config.js
//
// Configure the client-side of the Meteor platform.
//
// Configures:
//
//   Accounts.ui                         - restrict logins to username only (no email signups)
//
//   {{> _loginButtonsLoggedIn  }}       - change button text to 'Logout'
//   {{> _loginButtonsLoggedOut }}       - change button text to 'Login'
//
//
// last-modified: <2014-01-26 08:17:36 golden@golden-garage.net>
//

Accounts.ui.config(
    {
        passwordSignupFields: 'USERNAME_ONLY'
    });

Template[ "_loginButtonsLoggedIn" ].rendered = function () 
    {
        this.find( "#login-buttons-logout"   ).innerHTML = "Logout";
    };

Template[ "_loginButtonsLoggedOut" ].rendered = function () 
    {
        this.find( ".dropdown-toggle"        ).innerHTML = "Login";
        this.find( "#login-buttons-password" ).innerHTML = "Login";
    };
