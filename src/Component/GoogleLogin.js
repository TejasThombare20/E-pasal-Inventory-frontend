import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  return (
    <GoogleLogin
      clientId="293814315724-uh1nc79um836f4ttt27sjgr2olamfoja.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
