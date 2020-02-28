import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { api } from '../../services/apiconfig';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
	providers: [UserService],
})
export class UserEditComponent implements OnInit {
	public title_page: string;
	public user: User;
	public identity: any;
	public token: string;
	public status: string;
	public url: string;
	public froalaOptions: Object = {
		iconsTemplate: 'font_awesome_5',
		charCounterCount: true,
		language: 'es',
		toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
		toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
		toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
		toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
	};
	public afuConfig = {
		multiple: false,
		formatsAllowed: '.jpg,.png, .jpeg, .gif',
		maxSize: '1',
		uploadAPI: {
			url: api.url + 'user/upload',
			headers: {
				Authorization: this._userService.getToken(),
			},
		},
		theme: 'attachPin',
		hideProgressBar: false,
		hideResetBtn: true,
		hideSelectBtn: false,
		replaceTexts: {
			attachPinBtn: 'Sube tu imagen de perfil ',
		},
	};

	constructor(private _userService: UserService) {
		this.title_page = 'Ajustes';
		this.user = new User();
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		// Set user data for update
		this.user.id = this.identity.sub;
		this.user.name = this.identity.name;
		this.user.lastname = this.identity.lastname;
		this.user.email = this.identity.email;
		this.user.description = this.identity.description;
		this.user.image = this.identity.image;

		this.url = api.url;
	}

	ngOnInit(): void {}

	onSubmit(form: any) {
		this._userService.update(this.token, this.user).subscribe(
			response => {
				if (response.status == 'ok') {
					this.status = response.status;

					// update user in session
					let changes = response.data.changes;
					for (const change in changes) {
						if (changes[change]) {
							const value = changes[change];
							this.identity[change] = value;
						} else {
							this.identity[change] = null;
						}
					}

					localStorage.setItem(
						'identity',
						JSON.stringify(this.identity)
					);
				} else {
					this.status = 'error';
				}
			},
			error => {
				this.status = 'error';
				console.log(<any>error);
			}
		);
	}

	avatarUpload(datos: any) {
		let data = JSON.parse(datos.response);
		this.user.image = data.image;
	}
}
