import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { api } from './services/apiconfig';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [UserService, CategoryService],
})
export class AppComponent implements OnInit, DoCheck {
	title = 'blog-angular';
	public identity: any;
	public token: string;
	public url: string;
	public categories: Array<any>;

	constructor(
		private _userService: UserService,
		private _categoryService: CategoryService,
		private _router: Router
	) {
		this.loadUser();
		this.url = api.url;
	}

	ngOnInit() {
		console.log('web-app cargada correctamente');
		this.loadCategories();
	}

	ngDoCheck() {
		this.loadUser();
	}

	loadUser() {
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	// no funciona
	checkSession() {
		setTimeout(() => {
			if (this.identity) {
				if (this.identity.exp > this.identity.iat) {
					//cerrar sesion
					this._router.navigate(['/logout/1']);
				}
			}
		}, 5000);
	}

	loadCategories() {
		this._categoryService.getAll().subscribe(
			response => {
				if (response.status == 'ok') {
					this.categories = response.data;
				}
			},
			error => {
				console.log(error);
			}
		);
	}
}
