import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { api } from './services/apiconfig';
import { Router } from '@angular/router';

import * as bootstrap from 'bootstrap';

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
	public isLogged: boolean;

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
		this.checkSession();
	}

	loadUser() {
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	// check session expire
	checkSession() {
		if (this.identity) {
			let now = Math.floor(Date.now() / 1000);

			if (now > this.identity.exp) {
				//cerrar sesion
				this.isLogged = false;
				$('#sessionModal').modal('show');
				this._router.navigate(['/logout/1']);
			} else {
				this.isLogged = true;
			}
		} else {
		}
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
