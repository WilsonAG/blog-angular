import { Component, OnInit } from "@angular/core";
import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";
import { UserService } from "../../services/user.service";
import { api } from "../../services/apiconfig";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [PostService]
})
export class HomeComponent implements OnInit {
  public title_page: string;
  public url: string;
  public posts: Array<Post>;
  public identity: any;
  public token: string;

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.title_page = "Inicio";
    this.url = api.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == "ok") {
          this.posts = response.data;
          console.log(this.posts);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
