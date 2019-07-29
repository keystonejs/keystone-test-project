import Domify from 'react-domify';
import React from 'react';

import api from '../../../client/lib/api';
import styles from '../../../client/lib/styles';

const Test = React.createClass({
	displayName: 'Create Nested Data',
	getInitialState () {
		return {
			action: 'Start Test',
			data: {
				name: 'Nested ' + Date.now(),
				things: [{
					name: 'First Item',
					number: 1,
					location: {
						street1: '191 Clarence St',
						suburb: 'Sydney',
					},
					sublist: [
						{ name: 'Hello' },
						{ name: 'World' },
					],
				}, {
					name: 'Second Item',
					number: 2,
				}],
			},
		};
	},
	componentDidMount () {
		this.props.ready();
	},
	runTest () {
		api.post('/keystone/api/nesteds/create', {
			json: this.state.data,
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
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
