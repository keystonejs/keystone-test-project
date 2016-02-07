import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormField, FormInput } from 'elemental';

const App = React.createClass({
	componentDidMount () {
		ReactDOM.findDOMNode(this.refs.btn).focus();
	},
	render () {
		return (
			<div style={{ paddingLeft: 20, paddingRight: 20 }}>
				<div style={styles.box}>
					<img src="/images/logo.png" width="205" height="68" alt="KeystoneJS" />
					<hr />
					<h2 style={{ marginBottom: 0 }}>Create User</h2>
					<Form type="horizontal" style={{ marginTop: 40 }}>
						<FormField label="Email address:">
							<FormInput name="email" value="user@keystonejs.com" />
						</FormField>
						<FormField label="Password:">
							<FormInput name="password" value="admin" />
						</FormField>
					</Form>
					<hr />
					<Button ref="btn" type="primary">Test Create User</Button>
				</div>
			</div>
		);
	}
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
