// imports necesarios
import { ModuleWithProviders, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//importar componentes
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ErrorComponent } from "./components/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { CategoryNewComponent } from ".//components/category-new/category-new.component";

// Definir las rutas
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "inicio", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegisterComponent },
  { path: "logout/:sure", component: LoginComponent },
  { path: "ajustes", component: UserEditComponent },
  { path: "crear-categoria", component: CategoryNewComponent },
  { path: "**", component: ErrorComponent }
];

// Exportar configuracion de las rutas
export const appRoutingProviders: any = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
