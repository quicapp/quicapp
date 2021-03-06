import { Injectable } from "@angular/core";
import { RequestOptions, ConnectionBackend, Response, Request, RequestOptionsArgs, Headers, Http } from "@angular/http";
import { Observable } from "rxjs";


@Injectable()
export class HttpInterceptor extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  private setUserHeader(options?: RequestOptionsArgs) {
    let profile = localStorage.getItem('profile');
    if (profile) {
      let user = JSON.parse(profile);
      options.headers.append('user_id', user.user_id);
    }
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    let token = localStorage.getItem('server_token');
    options.headers.append('Authorization', `Bearer ${token}`);
    this.setUserHeader(options);
    return this.intercept(super.get(url, options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(url, options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(url, options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs(url, options)));
  }

  private getRequestOptionArgs(url: string, options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    // If the url contains '/api/' this means it's a call to our local server
    // so we add our custom header. In the future we'll add our real web server.
    if (url.includes('/api/')) {
      let token = localStorage.getItem('server_token');
      options.headers.append('Authorization', `Bearer ${token}`);
      options.headers.append('charset', 'UTF-8');
      this.setUserHeader(options);
    }

    options.headers.append('Content-Type', 'application/json');
    return options;
  }

  private isUnauthorized(status: number): boolean {
    return status === 0 || status === 401 || status === 403;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (this.isUnauthorized(err.status)) {
        if (err instanceof Response) {
          return Observable.throw(err.json().message || 'backend server error');
        }
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    });
  }
}
