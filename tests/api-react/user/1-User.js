import Domify from 'react-domify';
import React from 'react';

import api from '../../../client/lib/api';
import styles from '../../../client/lib/styles';

const Test = React.createClass({
	displayName: 'Create User',
	getInitialState () {
		return {
			action: 'Start Test',
			data: {
				name: '',
				email: '',
				password: '',
			},
		};
	},
	componentDidMount () {
		this.props.ready();
	},
	runTest () {
		api.post('/keystone/api/users/create', {
			json: this.state.data,
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			this.props.assert('status code is 400').truthy(() => res.statusCode === 400);
			this.props.assert('error is "validation errors"').truthy(() => body.error === 'validation errors');
			if (!this.state.data.password) {
				this.props.assert('name is required').truthy(() => body.detail.name.type === 'required');
				this.props.assert('email is required').truthy(() => body.detail.email.type === 'required');
				this.props.assert('password is required').truthy(() => body.detail.password.type === 'required');
				this.setState({
					data: {
						'name.full': 'first last',
						'email': 'not an email',
						'password': 'abcd1234',
						'password_confirm': 'abcd',
					},
				});
				this.props.ready();
			} else {
				this.props.assert('name passed validation').truthy(() => !body.detail.name);
				this.props.assert('email is required').truthy(() => body.detail.email.type === 'invalid');
				this.props.assert('passwords don\'t match').truthy(() => body.detail.password.type === 'invalid');
				this.props.complete();
			}
		});
	},
	render () {
		return (
			<div>
				<Domify style={styles.data} value={this.state.data} />
			</div>
		);
	},
});

module.exports = Test;
