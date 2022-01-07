var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
	autokey: { path: 'slug', from: 'name', unique: true },
	track: true,
});

Post.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400, collapse: true },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(() => {
	if (!this.content) return '';
	return this.content.extended || this.content.brief;
});

Post.userFieldOptions = (user) => ({
	state: {
		// normal users cannot change the state of a post
		noedit: !user.isEditor,
	},
	author: {
		// author is hidden from normal users
		hidden: !user.isEditor,
	},
});

Post.itemFieldOptions = (item, user) => ({
	name: {
		// non-editors cannot change the name of a published post
		noedit: item.state === 'published' && !user.isEditor,
	},
});

Post.modifyListQuery = (user, query) => {
	if (!user.isEditor) {
		// normal users can only get / update / delete their own posts
		query.where('author', user.id);
	}
};

Post.modifyItemData = (user, post) => {
	if (!user.isEditor) {
		// normal users will always be set as the author of posts they create
		post.author = user.id;
	}
};

transform.toJSON(Post);
Post.defaultColumns = 'name, state|20%, author|20%, categories|20%, publishedDate|20%';
Post.register();
