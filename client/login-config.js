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
// last-modified: <2014-01-27 12:44:19 golden@golden-garage.net>
//

Accounts.ui.config(
    {
        passwordSignupFields: 'USERNAME_ONLY'
    });


Template[ "_loginButtonsLoggedIn" ].rendered = function ()
    {
        var  loginButtonsLogin    = this.find( "#login-buttons-login" );
        if ( loginButtonsLogin    )          {   loginButtonsLogin.innerHTML    = "Logout"; }
    };

Template[ "_loginButtonsLoggedOut" ].rendered = function () 
    {
        var  loginButtonsLogout   = this.find( "#login-buttons-logout" );
        if ( loginButtonsLogout   )          {   loginButtonsLogout.innerHTML   = "Logout"; }

        var  dropdownToggle       = this.find( ".dropdown-toggle" );
        if ( dropdownToggle       )          {   dropdownToggle.innerHTML       = "Login";  }

        var  loginButtonsPassword = this.find( "#login-buttons-password" );
        if ( loginButtonsPassword )          {   loginButtonsPassword.innerHTML = "Login";  }
    };
