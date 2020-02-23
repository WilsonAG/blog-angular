import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { api } from "./apiconfig";

@Injectable()
export class UserService {
  public url: string;
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

  public signup(user, getToken = null): Observable<any> {
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
}
