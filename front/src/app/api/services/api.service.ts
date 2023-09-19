/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserSign } from '../models/user-sign';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
class ApiService extends __BaseService {
  static readonly postAuthNewUserPath = '/auth/newUser';
  static readonly postAuthLoginPath = '/auth/login';
  static readonly getAuthRefreshTokenPath = '/auth/refreshToken';
  static readonly getGame1IsGoodAnswerIdPath = '/game1/isGoodAnswer/{id}';
  static readonly getUserGetPath = '/user/get';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `ApiService.PostAuthNewUserParams` containing the following parameters:
   *
   * - `body`:
   *
   * - `authorization`: token with admin role
   */
  postAuthNewUserResponse(params: ApiService.PostAuthNewUserParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/newUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `ApiService.PostAuthNewUserParams` containing the following parameters:
   *
   * - `body`:
   *
   * - `authorization`: token with admin role
   */
  postAuthNewUser(params: ApiService.PostAuthNewUserParams): __Observable<null> {
    return this.postAuthNewUserResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param body undefined
   * @return OK
   */
  postAuthLoginResponse(body: UserSign): __Observable<__StrictHttpResponse<{accessToken?: string, refreshToken?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{accessToken?: string, refreshToken?: string}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return OK
   */
  postAuthLogin(body: UserSign): __Observable<{accessToken?: string, refreshToken?: string}> {
    return this.postAuthLoginResponse(body).pipe(
      __map(_r => _r.body as {accessToken?: string, refreshToken?: string})
    );
  }

  /**
   * @param authorization undefined
   */
  getAuthRefreshTokenResponse(authorization?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (authorization != null) __headers = __headers.set('authorization', authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/refreshToken`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param authorization undefined
   */
  getAuthRefreshToken(authorization?: string): __Observable<null> {
    return this.getAuthRefreshTokenResponse(authorization).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetGame1IsGoodAnswerIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `authorization`:
   */
  getGame1IsGoodAnswerIdResponse(params: ApiService.GetGame1IsGoodAnswerIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/game1/isGoodAnswer/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `ApiService.GetGame1IsGoodAnswerIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `authorization`:
   */
  getGame1IsGoodAnswerId(params: ApiService.GetGame1IsGoodAnswerIdParams): __Observable<null> {
    return this.getGame1IsGoodAnswerIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param authorization token
   * @return OK
   */
  getUserGetResponse(authorization: string): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (authorization != null) __headers = __headers.set('authorization', authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/user/get`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @param authorization token
   * @return OK
   */
  getUserGet(authorization: string): __Observable<User> {
    return this.getUserGetResponse(authorization).pipe(
      __map(_r => _r.body as User)
    );
  }
}

module ApiService {

  /**
   * Parameters for postAuthNewUser
   */
  export interface PostAuthNewUserParams {
    body: UserSign;

    /**
     * token with admin role
     */
    authorization: string;
  }

  /**
   * Parameters for getGame1IsGoodAnswerId
   */
  export interface GetGame1IsGoodAnswerIdParams {
    id: string;
    authorization?: string;
  }
}

export { ApiService }
