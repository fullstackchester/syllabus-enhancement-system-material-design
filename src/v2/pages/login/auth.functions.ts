import { FieldErrors } from "react-hook-form";
// import API_URL from "../../../environment";

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

export function googleAuthentication(){ 
    // const uiConfig = {
    //     signInSuccessUrl: API_URL + '/faculty', // Redirect URL after successful login
    //     signInOptions: [
    //       // List of authentication providers
    //       'google.com',
    //       // 'facebook.com',
    //       // 'twitter.com',
    //       // 'github.com',
    //       // 'password', // Email/Password
    //       // 'phone' // Phone Authentication
    //     ],
    //     tosUrl: '#terms-of-service', // Terms of Service URL
    //     privacyPolicyUrl: '#privacy-policy' // Privacy Policy URL
    // };
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());

    // ui.start('#firebaseui-auth-container', uiConfig);

}


export function authenticate(): void {

}


export function checkLocalStorage(): void {

}

export function saveAuthObject(): void {
    
}

export function emailValidator(error: FieldErrors): string | null {

  console.log(error)

  return ''
}