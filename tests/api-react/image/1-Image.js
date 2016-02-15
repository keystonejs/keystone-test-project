import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormField, FormInput, FileUpload } from 'elemental';

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
				<div style={{ overflow: "auto", padding: 4}}>
					<Button ref="btn" type="primary" onClick={this.runTest}>Test Image Upload</Button>
					<Button ref="btn" type="primary" onClick={this.runTest} style={{ float: "right" }}>Next</Button>
				</div>
			</div>
		);
	}
});

module.exports = Test;
