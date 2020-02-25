import { Component, OnInit, DoCheck } from "@angular/core";
import { UserService } from "./services/user.service";
import { CategoryService } from "./services/category.service";
import { api } from "./services/apiconfig";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
  title = "blog-angular";
  public identity: any;
  public token: string;
  public url: string;
  public categories: Array<any>;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.loadUser();
    this.url = api.url;
  }

  ngOnInit() {
    console.log("web-app cargada correctamente");
    this.loadCategories();
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  loadCategories() {
    this._categoryService.getAll().subscribe(
      response => {
        if (response.status == "ok") {
          this.categories = response.data;
          console.log(this.categories);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
