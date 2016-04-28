import blacklist from 'blacklist';
import Domify from 'react-domify';
import React from 'react';

import api from '../../../client/lib/api';
import styles from '../../../client/lib/styles';

const Test = React.createClass({
	displayName: 'Delete User',
	getInitialState () {
		return {
			deleted: false,
			user: blacklist(this.props.stepContext.user, 'fields'),
		};
	},
	componentDidMount () {
		this.props.ready();
	},
	runTest () {
		api.post(`/keystone/api/users/${this.state.user.id}/delete`, {
			json: {},
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			if (!this.state.deleted) {
				this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
				this.setState({
					deleted: true,
				});
				this.props.ready();
			} else if (this.state.user.id !== '1234') {
				this.props.assert('status code is 404').truthy(() => res.statusCode === 404);
				this.setState({
					user: {
						id: '1234',
						name: 'Invalid User',
					},
				});
				this.props.ready();
			} else {
				this.props.assert('status code is 500').truthy(() => res.statusCode === 500);
				this.props.assert('error should be "database error"').truthy(() => body.error === 'database error');
				this.props.complete();
			}
		});
	},
	render () {
		return (
			<div>
				<Domify style={styles.data} value={this.state.user} />
			</div>
		);
	},
});

module.exports = Test;
