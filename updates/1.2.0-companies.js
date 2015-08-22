exports.create = {
	User: [
		{
			"name.full": "Jed Watson",
			"email": "contact@keystonejs.com",
			"password": "admin",
			"company": "tm",
			"isAdmin": true
		}
	],
	Company: [
		{
			"__ref": "tm",
			"name": 'Thinkmill',
			"website": 'http://www.thinkmill.com.au',
			"github": 'thinkmill',
			"twitter": '@thethinkmill'
		}
	]
};
