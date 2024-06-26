import React, { useEffect } from 'react';

const FacebookAuth = ({ onLogin }) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '996119118916709',
        cookie: true,
        xfbml: true,
        version: 'v12.0',
      });

      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const handleLogin = () => {
    window.FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        onLogin(response.authResponse.accessToken);
      } else {
        window.FB.login((response) => {
          if (response.authResponse) {
            onLogin(response.authResponse.accessToken);
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        }, { scope: 'user_photos' });
      }
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Facebook</button>
    </div>
  );
};

export default FacebookAuth;