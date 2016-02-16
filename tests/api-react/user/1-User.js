import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Form, FormField, FormInput, Row } from 'elemental';

import api from '../../../client/lib/api';

const Test = React.createClass({
	getInitialState () {
		return {
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
			this.props.assert('status code is 400').truthy(res.statusCode === 400);
			this.props.complete();
		});
	},
	render () {
		return (
			<div>
				<h2 style={{ marginBottom: 0 }}>Create User</h2>
				<Form type="horizontal" style={{ marginTop: 40 }}>
					<FormField label="Name:">
						<FormInput />
					</FormField>
					<FormField label="Email address:">
						<FormInput />
					</FormField>
					<FormField label="Password:">
						<FormInput />
					</FormField>
				</Form>
				<hr />
				<Row>
					<Col sm="1/2">
						<Button ref="run" type="primary" onClick={this.runTest}>Test Create User</Button>
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
