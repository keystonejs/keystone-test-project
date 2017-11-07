var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

/*
Publishing Workflow feature is enabled by defining revisions & workflow options object & fields.

revisions: {
		enabled: true,
		excludeFields: // Fields to exclude from revision compare
	},

workflow: {
	enabled: false // can be disabled 
	stateField: 'state', // field to track content state
	selfApproval: true, // Allows users to self approval to change state
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
	workflow: {
		enabled: true,
		stateField: 'state',
		selfApproval: true,
		approvalStates: ['published', 'archived', 'deleted', 'schedulePublished', 'scheduleArchived'],
	},
	revisions: {
		enabled: true,
		excludeFields: ['workflow', 'publishDate', 'updatedBy', 'updatedAt'],
	},
});

Post.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	publishDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400, collapse: true },
	},
	workflow: {
		archiveDate: { type: Types.Date, index: true, noedit: true },
		publishDate: { type: Types.Date, index: true, noedit: true },
		approvalPending: { type: Boolean, noedit: true },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(() => {
	if (this.content) {
		return this.content.extended || this.content.brief;
	}
});

transform.toJSON(Post);
Post.defaultColumns = 'name,  author|20%, categories|20%, publishedDate|20%';
Post.register();
