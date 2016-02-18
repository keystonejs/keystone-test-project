import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Form, FormField, FormInput, FileUpload, Row } from 'elemental';

import api from '../../../client/lib/api';

const Test = React.createClass({
	getInitialState () {
		return {
			file: null,
			dataURI: null,
		};
	},
	componentDidMount () {
		this.props.ready();
	},
	handleFile (e, data) {
		this.setState({
			file: data.file,
			dataURI: data.dataURI,
		});
	},
	runTest () {
		this.props.run();
		var formData = new window.FormData();
		formData.append('name', 'Test ' + Date.now());
		if (this.state.file) {
			formData.append('heroImage', this.state.file);
		}
		api.post('/keystone/api/galleries/create', {
			body: formData,
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			// if (this.state.data.password === '') {
			// 	this.props.assert('status code is 400').truthy(() => res.statusCode === 400);
			// 	this.props.assert('error is "validation errors"').truthy(() => body.error === 'validation errors');
			// 	this.props.assert('password is required').truthy(() => body.detail.password.type === 'required');
			// 	this.setState({
			// 		data: blacklist(this.state.data, 'password'),
			// 	});
			// } else {
			// 	this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
			// 	this.props.assert('name has been updated').truthy(() => body.name === `${this.state.data.name.first} ${this.state.data.name.last}`);
			// 	this.props.complete({ user: body });
			// }
		});
	},
	render () {
		return (
			<div>
				<h2 style={{ marginBottom: 0 }}>Upload Image</h2>
				<Form type="horizontal">
					<FormField label="Image" style={localStyles.field}>
						<FileUpload buttonLabelInitial="Upload Image" buttonLabelChange="Change Image" onChange={this.handleFile} />
					</FormField>
				</Form>
				<hr />
				<Row>
					<Col sm="1/2">
						<Button ref="run" type="primary" onClick={this.runTest}>Test Image Upload</Button>
					</Col>
					{/*<Col sm="1/2" style={{ align: 'right' }}>
						<Button ref="next" type="default" onClick={this.props.next} style={{ float: "right" }}>Next</Button>
					</Col>*/}
				</Row>
			</div>
		);
	}
});

const localStyles = {
	field: {
		marginTop: 20,
	},
};

module.exports = Test;
