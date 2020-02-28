import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { api } from '../../services/apiconfig';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Post } from '../../models/post';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	providers: [UserService, PostService],
})
export class ProfileComponent implements OnInit {
	public url: string;
	public posts: Array<Post>;
	public identity: any;
	public token: string;
	public user: User;

	constructor(
		private _postService: PostService,
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.url = api.url;
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.getProfile();
	}

	getProfile() {
		this._route.params.subscribe(params => {
			let userID = +params['id'];
			this.getUser(userID);
			this.getPosts(userID);
		});
	}
	getUser(userID: number) {
		this._userService.getUser(userID).subscribe(
			respones => {
				this.user = respones.data;
			},
			error => {
				console.log(error);
			}
		);
	}

	getPosts(userID: number) {
		this._userService.getPosts(userID).subscribe(
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
				this.getProfile();
			},
			error => {
				console.log(error);
			}
		);
	}
}
