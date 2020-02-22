import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"]
})
export class ErrorComponent implements OnInit {
  public title_page: string;
  constructor() {
    this.title_page = "La pagina no existe";
  }

  ngOnInit(): void {}
}
