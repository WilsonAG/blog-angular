import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { api } from '../../services/apiconfig';

@Component({
	selector: 'app-post-detail',
	templateUrl: './post-detail.component.html',
	styleUrls: ['./post-detail.component.css'],
	providers: [PostService],
})
export class PostDetailComponent implements OnInit {
	public post: Post;
	public url: string;

	constructor(
		private _postService: PostService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.url = api.url;
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
