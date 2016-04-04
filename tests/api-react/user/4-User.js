import blacklist from 'blacklist';
import Domify from 'react-domify';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Row } from 'elemental';

import api from '../../../client/lib/api';
import styles from '../../../client/lib/styles';

const Test = React.createClass({
	displayName: '3-User',
	getInitialState () {
		return {
			deleted: false,
			user: blacklist(this.props.stepContext.user, 'fields'),
		};
	},
	componentDidMount () {
		this.props.ready();
		ReactDOM.findDOMNode(this.refs.run).focus();
	},
	runTest () {
		this.props.run();
		api.post(`/keystone/api/users/${this.state.user.id}/delete`, {
			json: {},
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			if (!this.state.deleted) {
				this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
				this.setState({
					deleted: true,
				});
			} else if (this.state.user.id !== '1234') {
				this.props.assert('status code is 404').truthy(() => res.statusCode === 404);
				this.setState({
					user: {
						id: '1234',
						name: 'Invalid User',
					},
				});
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
				<h2 style={{ marginBottom: 0 }}>Delete User</h2>
				<Domify style={styles.data} value={this.state.user} />
				<hr />
				<Row>
					<Col sm="1/2">
						<Button ref="run" type="primary" onClick={this.runTest}>Start Test</Button>
					</Col>
					<Col sm="1/2" style={{ align: 'right' }}>
						<Button ref="next" type="default" onClick={this.props.next} style={{ float: 'right' }}>Next</Button>
					</Col>
				</Row>

			</div>
		);
	},
});

module.exports = Test;
