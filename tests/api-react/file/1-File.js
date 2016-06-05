import React from 'react';
import { Button, Col, Form, FormField, FileUpload, Radio, Row } from 'elemental';

import api from '../../../client/lib/api';

const Test = React.createClass({
	displayName: 'Upload File',
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
				this.props.ready();
			}
		});
	},
	render () {
		return (
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
		);
	},
});

const localStyles = {
	field: {
		marginTop: 20,
	},
};

module.exports = Test;
