import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { api } from "./apiconfig";

@Injectable()
export class UserService {
  public url: string;
  public identity: any;
  public token: string;

  constructor(public _http: HttpClient) {
    this.url = api.url;
  }

  test() {
    return "hola mundo desde un service";
  }

  public register(user: User): Observable<any> {
    let json = JSON.stringify(user);
    let params = "json=" + json;

    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this._http.post(this.url + "register", params, { headers });
  }

  public signup(user: any, getToken = null): Observable<any> {
    if (getToken != null) {
      user.getToken = "true";
    }

    let json = JSON.stringify(user);
    let params = "json=" + json;

    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this._http.post(this.url + "login", params, { headers });
  }

  public update(token: string, user: any): Observable<any> {
    let json = JSON.stringify(user);
    let params = "json=" + json;
    let headers = new HttpHeaders()
      .set("Authorization", token)
      .set("Content-Type", "application/x-www-form-urlencoded");

    return this._http.put(this.url + "user/update", params, { headers });
  }

  public getIdentity() {
    let identity = JSON.parse(localStorage.getItem("identity"));
    if (identity && identity !== undefined) {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  public getToken() {
    let token = localStorage.getItem("token");
    if (token && token !== undefined) {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
