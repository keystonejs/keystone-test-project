const clone = function () {
	var obj = {};
	for (var i = 0; i < arguments.length; i++) {
		Object.assign(obj, arguments[i]);
	}
	return obj;
};

module.exports = clone;
