var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

/*
Publishing Workflow feature is enabled by defining revisions & workflow options object & fields.

revisions: {
		enabled: true,
		excludeFields: // Fields to exclude from revision compare
	},

publishing: {
	enabled: false // can be disabled
	stateField: 'state', // field to track content state
	selfApproval: true, // Allows users to self approval to change state
	approvalStates: ['draft', 'published', 'archived', 'deleted'],
	unpublishStates: 'archived' // default state for unpublished content
},

With workflow enabled User.permissions fields need to be added to enable users:
	isContributor
	isAuthor
	isEditor
*/
var Post = new keystone.List('Post', {
	autokey: { path: 'slug', from: 'name', unique: true },
	track: true,
	history: true,
	publishing: {
		enabled: true,
		stateField: 'state',
		selfApproval: true,
		approvalStates: ['draft', 'published', 'archived', 'deleted'],
		// State options for unpublished content
		unpublishStates: ['draft','archived'],
		// States that allow content to be visible by the public
		publishedStates: ['published']
	},
	revisions: {
		enabled: true,
		excludeFields: ['publishing', 'publishDate', 'updatedBy', 'updatedAt'],
	},
});

Post.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived, deleted', default: 'draft', index: true, noedit: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400, collapse: true },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(() => {
	if (this.content) {
		return this.content.extended || this.content.brief;
	}
});

transform.toJSON(Post);
Post.defaultColumns = 'name,  author|20%, categories|20%, publishedDate|20%, state|10%, publishing.requestApproval|10%, publishing.approvalPendingMessage|20%';
Post.register();
