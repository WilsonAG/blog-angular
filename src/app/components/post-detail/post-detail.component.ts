import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { api } from '../../services/apiconfig';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-post-detail',
	templateUrl: './post-detail.component.html',
	styleUrls: ['./post-detail.component.css'],
	providers: [PostService, UserService],
})
export class PostDetailComponent implements OnInit {
	public post: Post;
	public url: string;
	public identity: any;
	public token: string;

	constructor(
		private _postService: PostService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	) {
		this.url = api.url;
		this.identity = _userService.getIdentity();
		this.token = _userService.getToken();
	}

	ngOnInit(): void {
		this.getPost();
	}

	getPost() {
		// sacar id de la url
		this._route.params.subscribe(params => {
			let id = +params['id'];

			// peticion ajax
			this._postService.getPost(id).subscribe(
				response => {
					if (response.status == 'ok') {
						this.post = response.data;
						console.log(this.post);
					} else {
						this._router.navigate(['inicio']);
					}
				},
				error => {
					//console.log(error);
					this._router.navigate(['inicio']);
				}
			);
		});
	}
}
