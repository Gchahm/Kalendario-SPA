import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

declare const FB;

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {

  private baseUrl = environment.apiUrl + 'auth/facebook/';

  constructor() {

    // @ts-ignore
    window.fbAsyncInit = function () {
      FB.init({
        appId: '269698107486371',
        xfbml: true,
        version: 'v7.0'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  login(onSuccess: (project: any) => void) {
    // FB.login(response => {
    //     if (response.status === 'connected') {   // Logged into your webpage and Facebook.
    //       this.http.post<{key: string}>(this.baseUrl, {access_token: response.authResponse.accessToken})
    //         .toPromise()
    //         .then(onSuccess);
    //     } else { // Not logged into your webpage or we are unable to tell.
    //     }
    // });
  }
}
