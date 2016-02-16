import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Form, FormField, FormInput, FileUpload, Row } from 'elemental';

import api from '../../../client/lib/api';

const Test = React.createClass({
	getInitialState () {
		return {
			file: {},
		};
	},
	componentDidMount () {
		this.props.onInit();
	},
	handleFile (e) {
		let file = e.target.files[0]
		console.log(file);
	},
	render () {
		return (
			<div>
				<h2 style={{ marginBottom: 0 }}>Upload Image</h2>
				<Form type="horizontal">
					<FormField label="Image">
						<FileUpload buttonLabelInitial="Upload Image" buttonLabelChange="Change Image" onChange={this.handleFile} />
					</FormField>
				</Form>
				<hr />
				<Row>
					<Col sm="1/2">
						<Button ref="run" type="primary" onClick={this.runTest}>Test Image Upload</Button>
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
