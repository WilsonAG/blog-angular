import { Component, OnInit } from "@angular/core";
import { user } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title_page: string;
  public user: user;
  public status: string;
  public messages: string;
  public errors: any;
  constructor(private _userService: UserService) {
    this.title_page = "Registrate!";
    this.user = new user(1, "", "", "ROLE_USER", "", "", "", "");
  }

  ngOnInit(): void {
    console.log("componente de registro cargado");
  }

  onSubmit(form: any) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.status === "ok") {
          this.status = response.status;
        } else {
          this.status = "error";
        }
        this.errors = null;
        this.messages = response.message;
      },
      error => {
        this.status = "error";
        this.messages = error.error.message;
        this.errors = Object.values(error.error.errors);
      }
    );
  }
}
