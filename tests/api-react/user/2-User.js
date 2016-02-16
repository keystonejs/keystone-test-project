import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormField, FormInput } from 'elemental';

import api from '../../../client/lib/api';

const Test = React.createClass({
	getInitialState () {
		return {
			data: {
				'name.full': 'Vito Belgiorno-Zegna',
				email: 'test-' + Date.now() + '@keystonejs.com',
				password: 'test1234',
			},
		};
	},
	componentDidMount () {
		this.props.ready();
		ReactDOM.findDOMNode(this.refs.btn).focus();
	},
	runTest () {
		this.props.run();
		api.post('/keystone/api/users/create', {
			json: this.state.data,
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			this.props.assert('status code is 200').truthy(res.statusCode === 200);
			this.props.assert('email returned successfully').truthy(body.fields.email === this.state.data.email);
			this.props.complete();
		});
	},
	render () {
		return (
			<div>
				<h2 style={{ marginBottom: 0 }}>Create User</h2>
				<Form type="horizontal" style={{ marginTop: 40}}>
					<FormField label="Name">
						<FormInput defaultValue={this.state.data.name} />
					</FormField>
					<FormField label="Email address">
						<FormInput defaultValue={this.state.data.email} />
					</FormField>
					<FormField label="Password">
						<FormInput defaultValue={this.state.data.password} />
					</FormField>
				</Form>
				<hr />
				<div style={{ overflow: "auto", padding: 4}}>
					<Button ref="btn" type="primary" onClick={this.runTest} style={{ float: "right" }}>Test 2 Create User</Button>
					<Button ref="btn" type="primary" onClick={this.runTest} style={{ float: "right" }}>Next</Button>
				</div>
			</div>
		);
	}
});

module.exports = Test;
