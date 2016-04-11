import React from 'react';
import { Button, Col, Form, FormField, FileUpload, Radio, Row } from 'elemental';

import api from '../../../client/lib/api';

const Test = React.createClass({
	getInitialState () {
		return {
			file: null,
			dataURI: null,
			uploadMode: 'fileData',
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
	setUploadMode (e) {
		this.setState({
			uploadMode: e.target.value,
		});
	},
	runTest () {
		this.props.run();
		var formData = new window.FormData();
		formData.append('name', 'Test ' + Date.now());
		if (this.state.file && this.state.uploadMode === 'fileData') {
			formData.append('file', this.state.file);
		}
		api.post('/keystone/api/files/create', {
			body: formData,
			responseType: 'json',
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			if (this.state.file) {
				this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
				// this.props.assert('file has been uploaded').truthy(() => body.fields.file.url.substr(0, 25) === 'http://res.cloudinary.com');
				this.props.complete({ gallery: body });
			} else {
				this.props.assert('status code is 400').truthy(() => res.statusCode === 400);
				this.props.assert('error is "validation errors"').truthy(() => body.error === 'validation errors');
				this.props.assert('file is required').truthy(() => body.detail.file.type === 'required');
			}
		});
	},
	render () {
		return (
			<div>
				<h2 style={{ marginBottom: 0 }}>Upload File</h2>
				<Form type="horizontal">
					<FormField label="Radios">
						<div className="inline-controls">
							<Radio value="fileData" checked={this.state.uploadMode === 'fileData'} onChange={this.setUploadMode} label="File Data" />
							{/*
							<Radio value="localFile" checked={this.state.uploadMode === 'localFile'} onChange={this.setUploadMode} label="Local File" />
							<Radio value="base64" checked={this.state.uploadMode === 'base64'} onChange={this.setUploadMode} label="Base64" />
							<Radio value="remoteFile" checked={this.state.uploadMode === 'remoteFile'} onChange={this.setUploadMode} label="Remote Image" />
							*/}
						</div>
					</FormField>
					<FormField label="File" style={localStyles.field}>
						<FileUpload buttonLabelInitial="Upload File" buttonLabelChange="Change File" onChange={this.handleFile} />
					</FormField>
				</Form>
				<hr />
				<Row>
					<Col sm="1/2">
						<Button ref="run" type="primary" onClick={this.runTest}>Test File Upload</Button>
					</Col>
					<Col sm="1/2" style={{ align: 'right' }}>
						<Button ref="next" type="default" onClick={this.props.next} style={{ float: 'right' }}>Next</Button>
					</Col>
				</Row>
			</div>
		);
	},
});

const localStyles = {
	field: {
		marginTop: 20,
	},
};

module.exports = Test;
