import { User } from './user';
import { Category } from './category';

export class Post {
	public category: Category;
	public user: User;

	constructor(
		public id: number,
		public user_id: number,
		public category_id: number,
		public title: string,
		public content: string,
		public image: string,
		public createdAT: any
	) {}
}
