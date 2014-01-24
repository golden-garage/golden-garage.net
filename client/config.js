// client/config.js
//
// Configure the Meteor platform (client only).
//
// Configures:
//
//   Accounts.ui
//
//
// last-modified: <2014-01-24 13:38:38 golden@golden-garage.net>
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
