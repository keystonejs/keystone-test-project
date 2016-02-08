import React from 'react';
import ReactDOM from 'react-dom';
import xhr from 'xhr';
import { Button, Form, FormField, FormInput } from 'elemental';

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
		xhr.post('/keystone/api/user/create', {
			json: this.state.data,
		}, function (err, res, body) {
			console.log(err, res, body);
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
