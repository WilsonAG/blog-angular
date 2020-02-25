import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { CategoryService } from "../../services/category.service";
import { Post } from "../../models/post";

@Component({
  selector: "app-post-new",
  templateUrl: "./post-new.component.html",
  styleUrls: ["./post-new.component.css"],
  providers: [UserService, CategoryService]
})
export class PostNewComponent implements OnInit {
  public title_page: string;
  public identity: any;
  public token: string;
  public post: Post;

  public froalaOptions: Object = {
    iconsTemplate: "font_awesome_5",
    charCounterCount: true,
    toolbarButtons: ["bold", "italic", "underline", "paragraphFormat", "alert"],
    toolbarButtonsXS: [
      "bold",
      "italic",
      "underline",
      "paragraphFormat",
      "alert"
    ],
    toolbarButtonsSM: [
      "bold",
      "italic",
      "underline",
      "paragraphFormat",
      "alert"
    ],
    toolbarButtonsMD: [
      "bold",
      "italic",
      "underline",
      "paragraphFormat",
      "alert"
    ]
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.title_page = "Crear nueva entrada.";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, "", "", null, null);
  }

  onSubmit(form: any) {}
}
