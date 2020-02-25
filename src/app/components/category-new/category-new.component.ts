import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Category } from "../../models/category";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: "app-category-new",
  templateUrl: "./category-new.component.html",
  styleUrls: ["./category-new.component.css"],
  providers: [CategoryService]
})
export class CategoryNewComponent implements OnInit {
  public title_page: string;
  public identity: any;
  public token: string;
  public category: Category;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.title_page = "Crear nueva categoria";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, "");
  }

  ngOnInit(): void {}

  onSubmit(form: any) {
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if (response.status == "ok") {
          this.category = response.data;
          this.status = response.status;

          setTimeout(() => {
            this._router.navigate(["/inicio"]);
          }, 3000);
        } else {
          this.status = "error";
        }
      },
      error => {
        this.status = "error";
        console.log(<any>error);
      }
    );
  }
}
