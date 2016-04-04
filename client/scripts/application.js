import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormField, FormInput } from 'elemental';

const App = React.createClass({
	componentDidMount () {
		ReactDOM.findDOMNode(this.refs.btn).focus();
	},
	gotoKeystone () {
		window.location.href = '/keystone';
	},
	render () {
		return (
			<div style={{ paddingLeft: 20, paddingRight: 20 }}>
				<div style={styles.box}>
					<img src="/images/logo.png" width="205" height="68" alt="KeystoneJS" />
					<hr />
					<h2 style={{ marginBottom: 0 }}>Welcome,</h2>
					<p className="lead" style={{ marginTop: 10 }}>An admin user has been created for you:</p>
					<Form type="horizontal" style={{ marginTop: 40 }}>
						<FormField label="Email address:">
							<FormInput noedit style={{ display: 'block' }}>user@keystonejs.com</FormInput>
						</FormField>
						<FormField label="Password:">
							<FormInput noedit style={{ display: 'block' }}>admin</FormInput>
						</FormField>
					</Form>
					<hr />
					<Button ref="btn" type="primary" onClick={this.gotoKeystone} block>Got it, let's begin</Button>
				</div>
			</div>
		);
	},
});

const styles = {
	box: {
		backgroundColor: 'white',
		borderRadius: '0.3em',
		boxShadow: '0 2px 3px rgba(0, 0, 0, 0.075), 0 0 0 1px rgba(0,0,0,0.1)',
		margin: '6vh auto',
		maxWidth: 480,
		padding: '3em',
	},
};

ReactDOM.render(<App />, document.getElementById('app'));
