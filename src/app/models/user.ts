export class User {
  public id: number;
  public name: string;
  public lastname: string;
  public role: string;
  public email: string;
  public password: string;
  public description: string;
  public image: string;
  constructor() {
    this.id = 1;
    this.name = "";
    this.lastname = "";
    this.role = "ROLE_USER";
    this.email = "";
    this.password = "";
    this.description = "";
    this.image = "";
  }
}
