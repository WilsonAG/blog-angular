import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public title_page: string;
  public user: User;
  public status: string;
  public token: string;
  public identity: any;
  constructor(private _userService: UserService) {
    this.title_page = "Identificate!";
    this.user = new User();
  }

  ngOnInit(): void {}

  onSubmit(form: any) {
    this._userService.signup(this.user).subscribe(
      response => {
        // obtener el token del usuario logeado
        if (response.status != "error") {
          this.status = "ok";
          this.token = response.data;
          this._userService.signup(this.user, true).subscribe(response => {
            // obtener datos del usuario
            this.identity = response.data;

            // Guardar datos en el localStorage
            localStorage.setItem("token", this.token);
            localStorage.setItem("identity", JSON.stringify(this.identity));
          });
        } else {
          this.status = "error";
        }
      },
      error => {
        this.status = "error";
      }
    );
  }
}
