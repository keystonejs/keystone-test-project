import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormField, FormInput } from 'elemental';

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
		this.props.onInit();
		ReactDOM.findDOMNode(this.refs.btn).focus();
	},
	runTest () {
		this.props.onRun();
		api.post('/keystone/api/users/create', {
			json: this.state.data,
		}, (err, res, body) => {
			// TODO: this endpoint should return useful validation errors.
			// we're going to skip past it for now by expecting a 500 code
			// with { error: 'database error' }
			this.props.onPass();
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
				<Button ref="btn" type="primary" onClick={this.runTest}>Test Create User</Button>
			</div>
		);
	}
});

module.exports = Test;
