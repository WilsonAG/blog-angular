import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/category";
import { api } from "./apiconfig";

@Injectable()
export class CategoryService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = api.url;
  }

  create(token: string, cateogry: Category): Observable<any> {
    let json = JSON.stringify(cateogry);
    let params = "json=" + json;
    let headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", token);
    return this._http.post(this.url + "category", params, { headers });
  }

  getAll(): Observable<any> {
    let headers = new HttpHeaders().set(
      "Content-Type",
      "x-www-form-url-encoded"
    );
    return this._http.get(this.url + "category", { headers });
  }
}
