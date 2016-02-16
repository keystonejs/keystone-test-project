import React from'react';
import ReactDOM from 'react-dom';
import { Button, Col, Form, FormField, FormInput, Row } from 'elemental';

import api from '../../../client/lib/api';

const Test = React.createClass({
	getInitialState () {
		return {
			data: {
				name: this.props.stepContext.user.name,
				email: this.props.stepContext.user.email,
				password: this.props.stepContext.user.password,
			},
		};
	},
	componentDidMount () {
		this.props.onInit();
		ReactDOM.findDOMNode(this.refs.run).focus();
	},
	updateData (field, e) {
		this.setState({
			data: Object.assign({}, this.state.data, { [field]: e.target.value }),
		});
	},
	runTest () {
		this.props.onRun();
		api.post('/keystone/api/users/' + this.props.stepContext.user.id + '/delete', {
			json: this.state.data,
		}, (err, res, body) => {
			console.log('body', body);
			console.log('res', res);
			this.props.onPass()
		})
	},
	render () {
		return (
			<div>
				<h2 style={{ marginBottom: 0 }}>Delete User</h2>
				<Form type="horizontal" style={{ marginTop: 40 }}>
					<FormField label="Name">
						<FormInput defaultValue={this.state.data.name} onChange={e => { this.updateData('name', e); }} />
					</FormField>
					<FormField label="Email">
						<FormInput defaultValue={this.state.data.email} onChange={e => { this.updateData('email', e); }} />
					</FormField>
					<FormField label="Password">
						<FormInput defaultValue={this.state.data.password} onChange={e => { this.updateData('password', e); }} />
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
