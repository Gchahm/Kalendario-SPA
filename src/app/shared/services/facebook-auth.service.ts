import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
declare const FB;

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {

  private baseUrl = environment.apiUrl + 'auth/facebook/';

  constructor(private http: HttpClient) {
    // FB.init({
    //   appId      : '483082579154147',
    //   cookie     : true,                     // Enable cookies to allow the server to access the session.
    //   xfbml      : true,                     // Parse social plugins on this webpage.
    //   version    : 'v2.4'           // Use this Graph API version for this call.
    // });
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
