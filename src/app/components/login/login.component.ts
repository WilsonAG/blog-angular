import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
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

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title_page = "Identificate!";
    this.user = new User();
  }

  ngOnInit(): void {
    // Se ejecuta siempre que cargue el componenete
    // cierra sesion cuando llega el parametro sure a la url
    this.logout();
  }

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

            this._router.navigate(["/inicio"]);
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

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params["sure"];
      if (logout == 1) {
        localStorage.removeItem("token");
        localStorage.removeItem("identity");

        this.identity = null;
        this.token = null;

        // Redireccion a inicio
        this._router.navigate(["/inicio"]);
      }
    });
  }
}
