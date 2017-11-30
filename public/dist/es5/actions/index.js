'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	Here are a few sample actions for User managment.
	Feel free to remove and replace with your own actions
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

exports.default = {

	fetchUsers: function fetchUsers(params) {
		return function (dispatch) {
			return dispatch(_utils.TurboClient.getRequest('user', params, _constants2.default.USERS_RECEIVED));
		};
	},

	addUser: function addUser(params) {
		return function (dispatch) {
			return dispatch(_utils.TurboClient.postRequest('user', params, _constants2.default.USER_CREATED));
		};
	},

	// Unlike addUser, register() also maintains a session for login state. After calling 
	// TurboClient.createUser(), the new user is logged in as well:
	register: function register(params) {
		return function (dispatch) {
			return dispatch(_utils.TurboClient.createUser(params, _constants2.default.USER_CREATED));
		};
	},

	loginUser: function loginUser(credentials) {
		return function (dispatch) {
			return dispatch(_utils.TurboClient.login(credentials, _constants2.default.CURRENT_USER_RECEIVED));
		};
	},

	currentUser: function currentUser() {
		return function (dispatch) {
			return dispatch(_utils.TurboClient.currentUser(_constants2.default.CURRENT_USER_RECEIVED));
		};
	}

};