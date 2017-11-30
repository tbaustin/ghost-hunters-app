'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../../actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	This container serves primarily as an example of how to execute basic
	user tasks like login, logout, etc. Feel free to re-purpose this componenet 
	for your own project or create your own components using the functions 
	from here as a guide.
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

var Users = function (_Component) {
	_inherits(Users, _Component);

	function Users() {
		_classCallCheck(this, Users);

		var _this = _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).call(this));

		_this.state = {
			error: null,
			user: {
				username: ''
			}
		};
		return _this;
	}

	// On mount, we fetch all current users on the backend (this.props.fetchUsers) then 
	// check if there is a currently logged-in user (this.props.currentUser)


	_createClass(Users, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.props.fetchUsers({}).then(function (response) {
				return _this2.props.currentUser(); // get the logged-in user, if any
			}).then(function (response) {}).catch(function (err) {
				console.log('ERROR: ' + err.message);
			});
		}

		// This function updates a user:

	}, {
		key: 'updateUser',
		value: function updateUser(field, event) {
			if (event) event.preventDefault();

			var updated = Object.assign({}, this.state.user);
			updated[field] = event.target.value;
			this.setState({
				user: updated
			});
		}

		// This function creates a new user and adds it to the Turbo backend:

	}, {
		key: 'submitUser',
		value: function submitUser(event) {
			if (event) event.preventDefault();

			if (this.state.user.username.length == 0) {
				alert('Please Enter a Username');
				return;
			}

			this.props.addUser(this.state.user).then(function (response) {}).catch(function (err) {
				alert(err.message);
			});
		}

		// This function logs in the user on the Turbo backend:

	}, {
		key: 'loginUser',
		value: function loginUser(event) {
			if (event) event.preventDefault();

			if (this.state.user.username.length == 0) {
				alert('Please Enter a Username');
				return;
			}

			if (this.state.user.password == null) {
				alert('Please Enter a Password');
				return;
			}

			this.props.loginUser(this.state.user).then(function (response) {
				console.log('LOGIN: ' + JSON.stringify(response));
			}).catch(function (err) {
				alert(err.message);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var usersList = this.props.users.all || [];

			var joinTurbo = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'a',
					{ target: '_blank', href: 'https://www.velocity360.io/turbo' },
					'Join Turbo!'
				)
			);

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-md-6' },
						_react2.default.createElement(
							'h3',
							{ className: 'topmargin-sm nobottommargin' },
							'Add User'
						),
						_react2.default.createElement('input', { className: 'form-control', onChange: this.updateUser.bind(this, 'username'), type: 'text', placeholder: 'username' }),
						_react2.default.createElement('br', null),
						_react2.default.createElement('input', { className: 'form-control', onChange: this.updateUser.bind(this, 'password'), type: 'password', placeholder: 'password' }),
						_react2.default.createElement('br', null),
						_react2.default.createElement(
							'button',
							{ className: 'btn btn-info', onClick: this.submitUser.bind(this) },
							'Submit'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'col-md-6' },
						_react2.default.createElement(
							'h4',
							{ className: 'topmargin-sm nobottommargin' },
							'Current Users'
						),
						_react2.default.createElement(
							'ol',
							{ style: { paddingLeft: 16 } },
							usersList.map(function (user, i) {
								return _react2.default.createElement(
									'li',
									{ key: user.id },
									user.username
								);
							})
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-md-6' },
						_react2.default.createElement(
							'h3',
							{ className: 'topmargin-sm nobottommargin' },
							'Login User'
						),
						_react2.default.createElement('input', { className: 'form-control', onChange: this.updateUser.bind(this, 'username'), type: 'text', placeholder: 'username' }),
						_react2.default.createElement('br', null),
						_react2.default.createElement('input', { className: 'form-control', onChange: this.updateUser.bind(this, 'password'), type: 'password', placeholder: 'password' }),
						_react2.default.createElement('br', null),
						_react2.default.createElement(
							'button',
							{ className: 'btn btn-info', onClick: this.loginUser.bind(this) },
							'Log In'
						)
					),
					this.props.users.currentUser == null ? null : _react2.default.createElement(
						'div',
						{ className: 'col-md-6' },
						_react2.default.createElement(
							'h4',
							{ className: 'topmargin-sm' },
							'Currently Logged In As: ',
							this.props.users.currentUser.username
						),
						_react2.default.createElement(
							'button',
							{ className: 'btn btn-info' },
							'Log Out'
						)
					)
				)
			);
		}
	}]);

	return Users;
}(_react.Component);

var stateToProps = function stateToProps(state) {
	return {
		users: state.user
	};
};

var dispatchToProps = function dispatchToProps(dispatch) {
	return {
		fetchUsers: function fetchUsers(params) {
			return dispatch(_actions2.default.fetchUsers(params));
		},
		addUser: function addUser(params) {
			return dispatch(_actions2.default.addUser(params));
		},
		loginUser: function loginUser(credentials) {
			return dispatch(_actions2.default.loginUser(credentials));
		},
		currentUser: function currentUser() {
			return dispatch(_actions2.default.currentUser());
		}
	};
};

exports.default = (0, _reactRedux.connect)(stateToProps, dispatchToProps)(Users);