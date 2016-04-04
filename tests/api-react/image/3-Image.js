import Domify from 'react-domify';
import React from 'react';
import { Button, Col, Row } from 'elemental';

import api from '../../../client/lib/api';
import styles from '../../../client/lib/styles';

const Test = React.createClass({
	getInitialState () {
		var images = [].concat(this.props.stepContext.gallery.fields.images).reverse();
		return {
			data: {
				id: this.props.stepContext.gallery.id,
				images: images,
			},
		};
	},
	componentDidMount () {
		this.props.ready();
	},
	runTest () {
		this.props.run();

		api.post('/keystone/api/galleries/' + this.props.stepContext.gallery.id, {
			json: this.state.data,
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
			this.props.assert('images have been reordered').truthy(() => body.fields.images[0].public_id === this.state.data.images[0].public_id);
		});
	},
	render () {
		return (
			<div>
				<h2 style={{ marginBottom: 0 }}>Manage Images</h2>
				<Domify style={styles.data} value={this.state.data} />
				<hr />
				<Row>
					<Col sm="1/2">
						<Button ref="run" type="primary" onClick={this.runTest}>Test Images Update</Button>
					</Col>
					{/* <Col sm="1/2" style={{ align: 'right' }}>
						<Button ref="next" type="default" onClick={this.props.next} style={{ float: "right" }}>Next</Button>
					</Col>*/}
				</Row>
			</div>
		);
	},
});

module.exports = Test;
