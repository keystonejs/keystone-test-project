module.exports = [
	require('./user/1-User'), // Tests User validation
	require('./user/2-User'), // Creates a new User
	require('./user/3-User'), // Updates the User
	require('./user/4-User'), // Deletes the User
	require('./image/1-Image'), // Creates a Gallery and uploads an image
	require('./image/2-Image'), // Updates the Gallery with multiple images
	require('./image/3-Image'), // Reorders Gallery images then removes them
	require('./file/1-File'), // Creates a new File item and uploads a file
];
