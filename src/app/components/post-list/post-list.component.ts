import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
	@Input() posts: any;
	@Input() identity: any;
	@Input() url: any;

	@Output()
	delete = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	deletePost(post_id) {
		this.delete.emit(post_id);
	}
}
