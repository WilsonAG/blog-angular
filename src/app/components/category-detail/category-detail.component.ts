import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { api } from '../../services/apiconfig';

@Component({
	selector: 'app-category-detail',
	templateUrl: './category-detail.component.html',
	styleUrls: ['./category-detail.component.css'],
	providers: [CategoryService, UserService, PostService],
})
export class CategoryDetailComponent implements OnInit {
	public title_page: String;
	public category: Category;
	public posts: any;
	public url: string;
	public identity: any;
	public token: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _categoryService: CategoryService,
		private _userService: UserService,
		private _postService: PostService
	) {
		this.url = api.url;
		this.identity = _userService.getIdentity();
		this.token = _userService.getToken();
	}

	ngOnInit(): void {
		this.getPostsByCategory();
	}

	getPostsByCategory() {
		this._route.params.subscribe(params => {
			let id = params['id'];
			this._categoryService.getCategory(id).subscribe(
				response => {
					if (response.status == 'ok') {
						this.category = response.data;

						this._categoryService
							.getPosts(this.category.id)
							.subscribe(
								response => {
									if (response.status == 'ok') {
										this.posts = response.data;
									} else {
										this._router.navigate(['/inicio']);
									}
								},
								error => {
									console.log(error);
									this._router.navigate(['/inicio']);
								}
							);
					} else {
						this._router.navigate(['/inicio']);
					}
				},
				error => {
					console.log(error);
				}
			);
		});
	}

	getPosts() {
		this._postService.getPosts().subscribe(
			response => {
				if (response.status == 'ok') {
					this.posts = response.data;
					//console.log(this.posts)
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	deletePost(id: number) {
		this._postService.delete(this.token, id).subscribe(
			response => {
				this.getPosts();
				this.getPostsByCategory();
			},
			error => {
				console.log(error);
			}
		);
	}
}
