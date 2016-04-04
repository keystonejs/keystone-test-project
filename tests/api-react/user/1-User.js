import Domify from 'react-domify';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Row } from 'elemental';

import api from '../../../client/lib/api';
import styles from '../../../client/lib/styles';

const Test = React.createClass({
	displayName: '1-User',
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
		ReactDOM.findDOMNode(this.refs.run).focus();
	},
	runTest () {
		this.props.run();
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
					action: 'Continue Test',
					data: {
						'name.full': 'first last',
						'email': 'not an email',
						'password': 'abcd1234',
						'password_confirm': 'abcd',
					},
				});
			} else {
				this.props.assert('email is required').truthy(() => body.detail.email.type === 'invalid');
				this.props.assert('passwords don\'t match').truthy(() => body.detail.password.type === 'invalid');
				this.props.complete();
			}
		});
	},
	render () {
		return (
			<div>
				<h2 style={{ marginBottom: 0 }}>Create User</h2>
				<Domify style={styles.data} value={this.state.data} />
				<hr />
				<Row>
					<Col sm="1/2">
						<Button ref="run" type="primary" onClick={this.runTest}>{this.state.action}</Button>
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
