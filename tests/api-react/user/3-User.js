import blacklist from 'blacklist';
import Domify from 'react-domify';
import React from 'react';

import api from '../../../client/lib/api';
import styles from '../../../client/lib/styles';

const Test = React.createClass({
	displayName: 'Update User',
	getInitialState () {
		return {
			data: {
				name: { first: 'Test', last: 'Update' },
				password: '',
			},
		};
	},
	componentDidMount () {
		this.props.ready();
	},
	runTest () {
		api.post('/keystone/api/users/' + this.props.stepContext.user.id, {
			json: this.state.data,
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			if (this.state.data.password === '') {
				this.props.assert('status code is 400').truthy(() => res.statusCode === 400);
				this.props.assert('error is "validation errors"').truthy(() => body.error === 'validation errors');
				this.props.assert('password is required').truthy(() => body.detail.password.type === 'required');
				this.setState({
					data: blacklist(this.state.data, 'password'),
				});
				this.props.ready();
			} else {
				this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
				this.props.assert('name has been updated').truthy(() => body.name === `${this.state.data.name.first} ${this.state.data.name.last}`);
				this.props.complete({ user: body });
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
