import Domify from 'react-domify';
import React from 'react';

import api from '../../../client/lib/api';
import styles from '../../../client/lib/styles';

const Test = React.createClass({
	displayName: 'Manage Images',
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
		api.post('/keystone/api/galleries/' + this.props.stepContext.gallery.id, {
			json: this.state.data,
		}, (err, res, body) => {
			this.props.result('Received response:', body);
			this.props.assert('status code is 200').truthy(() => res.statusCode === 200);
			this.props.assert('images have been reordered').truthy(() => body.fields.images[0].public_id === this.state.data.images[0].public_id);
			this.props.complete();
		});
	},
	render () {
		return (
			<div>
				<Domify style={styles.data} value={this.state.data} />
			</div>
		);
	},
});

module.exports = Test;
