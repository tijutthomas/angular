How to Set Http Request Header in Angular 4 and Angular 2?
The HTTP Interceptors are used to Set Http Headers Request in Angular 4 using the import from “@angular/common/http”. The HTTP Interceptors are available in Angular 4.x versions.

The HTTP Interceptors are not supported in Angular 2. We are creating the HttpClient Injectable class to achieve this. You can see the below examples for set http headers request with and without HTTP interceptors.

What Is the Use of Interceptors in Angular 4?
The Interceptors is a common used to set default headers for all responses.

Example 1 –  For Angular 4

Set Headers Http Request Using Http Interceptors -
The HTTP Interceptors are now available via using the new HttpClient from angular/common/http in the Angular 4.x versions.

Steps 1 - Writing an interceptor for adds a header for every request!
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

export class AddHttpHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader = 'token_value';
    const clonedReq = req.clone({headers: req.headers.set('Authorization', authHeader)});

    return next.handle(clonedReq);
  }
}

Steps 2 - Providing your interceptor!
- After creating the interceptor, we need to register it using the HTTP_INTERCEPTORS in the @NgModule()

import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddHttpHeaderInterceptor,
    multi: true,
  }],
})

export class AppModule {}

Example 2-  For Angular 2

Set Headers Http Request without HTTP Interceptors  -

Steps 1 – We are creating the HttpClient Injectable class.
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient {
  constructor(private http: Http) {}

  createAuthHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa('user-name:password')); 
  }

  get(url) {
    let headers = new Headers();
    this.createAuthHeader(headers);

    return this.http.get(url, {headers: headers});
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthHeader(headers);

    return this.http.post(url, data, {headers: headers});
  }

  put(url, data) {
    let headers = new Headers();
    this.createAuthHeader(headers);

    return this.http.put(url, data, {headers: headers});
  }
}

Steps 2 - Injecting the HttpClient object in the Component
import { HttpClient } from '../http-client';

export class userComponent {
  constructor(http: HttpClient) {
    this.http = httpClient;
  }

  getUsers() {
    this.http.get(url).subscribe(data =>{console.log(data); });
  }

  addUsers(user) {
    this.http.post(url, user).subscribe(data =>{console.log(data); });
  }
}
