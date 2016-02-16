import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Form, FormField, FormInput, Row } from 'elemental';

import api from '../../../client/lib/api';

const Test = React.createClass({
	getInitialState () {
		return {
			data: {
				name: 'Vito Belgiorno-Zegna',
				email: 'vito@tm.com',
				password: 'test1234',
			},
		};
	},
	componentDidMount () {
		this.props.onInit();
		ReactDOM.findDOMNode(this.refs.run).focus();
	},
	runTest () {
		this.props.onRun();
		api.post('/keystone/api/users/create', {
			json: this.state.data,
		}, (err, res, body) => {

			if (body.detail && body.detail.errmsg) {
				console.log(body.detail.errmsg);
			} else {
				console.log('BAM ' + body.fields.email + ' == ' + this.state.data.email);
				this.props.onPass({ user: body });
			}
		});
	},
	render () {
		return (
			<div>
				<h2 style={{ marginBottom: 0 }}>Create User with Duplicate</h2>
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
