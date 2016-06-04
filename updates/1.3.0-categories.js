var randomWord = require('random-word');

var categories = [];

for (var i = 0; i <= 1100; i++) {
	categories.push({ name: randomWord() });
}

exports.create = {
	PostCategory: categories,
};
