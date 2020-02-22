import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public title_page: string;
  constructor() {
    this.title_page = "Registrate!";
  }

  ngOnInit(): void {
    console.log("componente de registro cargado");
  }
}
