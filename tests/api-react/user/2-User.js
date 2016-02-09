import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormField, FormInput } from 'elemental';

import api from '../../../client/lib/api';

const Test = React.createClass({
	getInitialState () {
		return {
			data: {
				name: 'Vito Belgiorno-Zegna',
				email: 'test-' + Date.now() + '@keystonejs.com',
				password: 'test1234',
			},
		};
	},
	componentDidMount () {
		this.props.onInit();
		ReactDOM.findDOMNode(this.refs.btn).focus();
	},
	runTest () {
		this.props.onRun();
		api.post('/keystone/api/users/create', {
			json: this.state.data,
		}, (err, res, body) => {
			console.log('BAM ' + body.fields.email + ' == ' + this.state.data.email);
			this.props.onPass({ user: body });
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
				<Button ref="btn" type="primary" onClick={this.runTest}>Test 2 Create User</Button>
			</div>
		);
	}
});

module.exports = Test;
