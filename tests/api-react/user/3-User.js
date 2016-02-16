import blacklist from 'blacklist';
import Domify from 'react-domify';
import React from'react';
import ReactDOM from 'react-dom';
import { Button, Col, Form, FormField, FormInput, Row } from 'elemental';

import api from '../../../client/lib/api';
import clone from '../../../client/lib/clone';
import styles from '../../../client/lib/styles';

const Test = React.createClass({
	displayName: '3-User',
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
		ReactDOM.findDOMNode(this.refs.run).focus();
	},
	runTest () {
		this.props.run();
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
				<h2 style={{ marginBottom: 0 }}>Update User</h2>
				<Domify style={styles.data} value={this.state.data} />
				<hr />
				<Row>
					<Col sm="1/2">
						<Button ref="run" type="primary" onClick={this.runTest}>Update Test User</Button>
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
