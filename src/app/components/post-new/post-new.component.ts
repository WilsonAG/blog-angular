import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { api } from '../../services/apiconfig';
import { PostService } from '../../services/post.service';

@Component({
	selector: 'app-post-new',
	templateUrl: './post-new.component.html',
	styleUrls: ['./post-new.component.css'],
	providers: [UserService, CategoryService, PostService],
})
export class PostNewComponent implements OnInit {
	public title_page: string;
	public identity: any;
	public token: string;
	public post: Post;
	public categories: Array<any>;
	public status: string;
	public message: string;
	public isEdit: boolean;
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
			url: api.url + 'post/upload',
			headers: {
				Authorization: this._userService.getToken(),
			},
		},
		theme: 'attachPin',
		hideProgressBar: false,
		hideResetBtn: true,
		hideSelectBtn: false,
		replaceTexts: {
			attachPinBtn: 'Selecciona la imagen...',
		},
	};

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _categoryService: CategoryService,
		private _postService: PostService
	) {
		this.title_page = 'Crear nueva entrada.';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.isEdit = false;
		this.url = api.url;
	}

	ngOnInit(): void {
		this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
		this.getCategories();
	}

	onSubmit(form: any) {
		this._postService.create(this.token, this.post).subscribe(
			response => {
				if (response.status == 'ok') {
					this.post = response.data;
					this.status = 'ok';
					this.message = response.message;

					setTimeout(() => {
						this._router.navigate(['inicio']);
					}, 5000);
				} else {
					this.status = 'error';
				}
			},
			error => {
				console.log(<any>error);
				this.message = error.error.message;
				this.status = 'error';
			}
		);
	}

	getCategories() {
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

	imageUpload(data: any) {
		let image_data = JSON.parse(data.response);
		this.post.image = image_data.image;
	}
}
