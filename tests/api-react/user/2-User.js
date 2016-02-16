import Domify from 'react-domify';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Form, FormField, FormInput, Row } from 'elemental';

import api from '../../../client/lib/api';
import clone from '../../../client/lib/clone';
import styles from '../../../client/lib/styles';

const Test = React.createClass({
	displayName: '2-User',
	getInitialState () {
		return {
			action: 'Start Test',
			data: {
				'name.full': 'Test User',
				email: 'user@keystonejs.com',
				password: 'test1234',
				password_confirm: 'test1234',
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
			if (this.state.data.email === 'user@keystonejs.com') {
				this.props.assert('status code is 500').truthy(() => res.statusCode === 500);
				this.props.assert('error is "database error"').truthy(() => body.error === 'database error');
				this.setState({
					data: clone(this.state.data, {
						email: 'user-' + Date.now() + '@keystonejs.com',
					}),
				});
			} else {
				this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
				this.props.assert('email returned successfully').truthy(() => body.fields.email === this.state.data.email);
				this.props.complete({ user: body });
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
						<Button ref="run" type="primary" onClick={this.runTest}>Test 2 Create User</Button>
					</Col>
					<Col sm="1/2" style={{ align: 'right' }}>
						<Button ref="next" type="default" onClick={this.props.next} style={{ float: "right" }}>Next</Button>
					</Col>
				</Row>
			</div>
		);
	}
});

module.exports = Test;
