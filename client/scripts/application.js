var React = require('react');

var { Button } = require('elemental');

var App = React.createClass({
	componentDidMount () {
		React.findDOMNode(this.refs.btn).focus();
	},
	render () {
		return (
			<div className="box">
				<img id="logo" src="/images/logo.png" width="205" height="68" alt="KeystoneJS" />
				<h3>Welcome to KeystoneJS</h3>
				<p className="welcome">An admin user has been created for you:</p>
				<div className="details">
					<div className="label">
						Email address:
					</div>
					<div className="value">
						<code>user@keystonejs.com</code>
					</div>
				</div>
				<div className="details">
					<div className="label">
						Password:
					</div>
					<div className="value">
						<code>admin</code>
					</div>
				</div>
				<div className="toolbar">
					<Button ref="btn" href="/keystone">Open KeystoneJS</Button>
				</div>
			</div>
		);
	}
});

React.render(
	<App />,
	document.getElementById('app')
);
