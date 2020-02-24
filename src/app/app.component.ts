import { Component, OnInit, DoCheck } from "@angular/core";
import { UserService } from "./services/user.service";
import { api } from "./services/apiconfig";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = "blog-angular";
  public identity: any;
  public token: string;
  public url: string;

  constructor(public _userService: UserService) {
    this.loadUser();
    this.url = api.url;
  }

  ngOnInit() {
    console.log("web-app cargada correctamente");
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
