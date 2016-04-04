var keystone = require('keystone');
var lipsum = require('lorem-ipsum');
var randomkey = require('randomkey');
var transform = require('model-transform');

var Autocreate = new keystone.List('Autocreate', {
	autokey: { from: 'text', path: 'key', unique: true },
	autocreate: true,
	noedit: true,
});

function randomNumber () {
	return Math.round(Math.random() * 100000);
}

function randomBoolean () {
	return Math.random() > 0.5;
}

function randomString () {
	return randomkey([10, 20]);
}

Autocreate.add({
	text: { type: String, index: true, default: randomString },
	number: { type: Number, index: true, default: randomNumber },
	boolean: { type: Boolean, index: true, default: randomBoolean },
	datetime: { type: Date, index: true, default: Date.now },
	html: { type: String, default: lipsum.bind(null, { count: 2, units: 'paragraphs' }) },
	markdown: { type: String, index: true, default: lipsum },
});

transform.toJSON(Autocreate);
Autocreate.defaultColumns = 'text, number, boolean, datetime';
Autocreate.register();
