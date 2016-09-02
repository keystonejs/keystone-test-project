var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true, unique: true },
	password: { type: Types.Password, initial: true, required: true },
	company: { type: Types.Relationship, ref: 'Company', initial: true, index: true },
	address: { type: Types.Location, collapse: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	isEditor: { type: Boolean, label: 'Can manage all posts and update their state', index: true },
	isProtected: { type: Boolean, noedit: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

/**
 * PROTECTING THE DEMO USER
 *
 * Keystone's dynamic list options are used here to protect the demo user
 * from being deleted or having the login details changed
 */

User.itemOptions = (item, user) => ({
	// protected users cannot be deleted, and users cannot delete themselves
	nodelete: item.isProtected || user && user.id === item.id,
});

User.itemFieldOptions = (item, user) => ({
	// protected users have the following fields set to noedit:
	name: { noedit: item.isProtected },
	email: { noedit: item.isProtected },
	password: { noedit: item.isProtected },
	isAdmin: { noedit: item.isProtected },
});

transform.toJSON(User);
User.defaultColumns = 'name, email, company, isAdmin';
User.register();
