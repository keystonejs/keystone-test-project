import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Form, FormField, FormInput, FileUpload, Radio, Row } from 'elemental';

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
			uploadMode: e.target.value
		});
	},
	runTest () {
		this.props.run();
		var formData = new window.FormData();
		formData.append('name', 'Test ' + Date.now());
		if (this.state.file && this.state.uploadMode === 'fileData') {
			formData.append('heroImage', this.state.file);
		} else if (this.state.dataURI && this.state.uploadMode === 'base64') {
			formData.append('heroImage', this.state.dataURI);
		} else if (this.state.uploadMode === 'remoteImage') {
			formData.append('heroImage', 'http://keystonejs.com/images/logo.png');
		}
		api.post('/keystone/api/galleries/create', {
			body: formData,
			responseType: 'json',
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			if (this.state.file) {
				this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
				this.props.assert('image has been uploaded').truthy(() => body.fields.heroImage.url.substr(0, 25) === 'http://res.cloudinary.com');
				this.props.complete({ gallery: body });
			} else if (this.state.uploadMode === 'remoteImage') {
				this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
				this.props.assert('image has been uploaded').truthy(() => body.fields.heroImage.url.substr(0, 25) === 'http://res.cloudinary.com');
				this.props.assert('image is the correct size').truthy(() => body.fields.heroImage.width === 207);
				this.props.complete({ gallery: body });
			} else {
				this.props.assert('status code is 400').truthy(() => res.statusCode === 400);
				this.props.assert('error is "validation errors"').truthy(() => body.error === 'validation errors');
				this.props.assert('image is required').truthy(() => body.detail.heroImage.type === 'required');
			}
		});
	},
	render () {
		return (
			<div>
				<h2 style={{ marginBottom: 0 }}>Upload Image</h2>
				<Form type="horizontal">
					<FormField label="Radios">
						<div className="inline-controls">
							<Radio value="fileData" checked={this.state.uploadMode === 'fileData'} onChange={this.setUploadMode} label="File Data" />
							<Radio value="base64" checked={this.state.uploadMode === 'base64'} onChange={this.setUploadMode} label="Base64" />
							<Radio value="remoteImage" checked={this.state.uploadMode === 'remoteImage'} onChange={this.setUploadMode} label="Remote Image" />
						</div>
					</FormField>
					<FormField label="Image" style={localStyles.field}>
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

const localStyles = {
	field: {
		marginTop: 20,
	},
};

module.exports = Test;
