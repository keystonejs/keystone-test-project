import Domify from 'react-domify';
import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'elemental';

import steps from '../../tests/api-react';

const App = React.createClass({
	getInitialState () {
		return {
			log: [],
			step: 1,
			stepContext: {},
			nextStepContext: {},
		};
	},
	log (style, content) {
		if (arguments.length === 1) {
			content = style;
			style = styles.message;
		}
		this.setState({
			log: [{ style, content }].concat(this.state.log),
		});
	},
	stepReady () {
		this.setState({
			log: [],
		}, () => {
			this.log(`Step ${this.state.step} ready\n`);
		});
	},
	stepRun () {
		this.log(`Step ${this.state.step} running...\n`);
	},
	stepResult () {
		this.log(`Step ${this.state.step} result:\n`);
		for (var i = 0; i < arguments.length; i++) {
			this.log(arguments[i]);
		}
	},
	stepAssert (msg) {
		// this.log(`Step ${this.state.step} asserts:\n`);
		var self = this;
		return {
			truthy (fn) {
				try {
					if (fn()) self.log(styles.pass, '[pass] ' + msg);
					else self.log(styles.fail, '[fail] ' + msg);
				} catch (e) {
					console.log(e);
					self.log(styles.fail, '[error] ' + e.name + ': ' + e.message);
				}
			}
		};
	},
	stepComplete (nextStepContext) {
		this.setState({ nextStepContext });
		this.log(`Step ${this.state.step} complete\n`);
	},
	nextStep () {
		this.setState({
			step: this.state.step + 1,
			stepContext: this.state.nextStepContext,
			nextStepContext: null,
		});
	},
	renderLog () {
		return this.state.log.map((msg, i) => {
			if (typeof msg.content === 'object') {
				return <Domify style={styles.obj} key={`log${i}`} value={msg.content} />;
			}
			return <div style={msg.style} key={`log${i}`}>{msg.content}</div>;
		});
	},
	render () {
		console.log(this.state.stepContext);
		const StepComponent = steps[this.state.step - 1];
		return (
			<div style={{ paddingLeft: 20, paddingRight: 20 }}>
				<Row>
					<Col sm="1/2">
						<div style={styles.box}>
							<StepComponent
								assert={this.stepAssert}
								complete={this.stepComplete}
								next={this.nextStep}
								ready={this.stepReady}
								result={this.stepResult}
								run={this.stepRun}
								stepContext={this.state.stepContext}
							/>
						</div>
					</Col>
					<Col sm="1/2">
						<div style={styles.box}>
							{this.renderLog()}
						</div>
					</Col>
				</Row>
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
		padding: '3em',
	},
	obj: {
		border: '1px solid #ccc',
		fontFamily: 'Monaco',
		fontSize: '0.9em',
		margin: '0.3em -1em',
		padding: '0.5em 1.3em',
	},
	message: {
		fontSize: '1.2em',
		margin: '0.2em',
	},
	pass: {
		color: 'green',
		fontFamily: 'Monaco',
		margin: '0.2em',
	},
	fail: {
		color: 'red',
		fontFamily: 'Monaco',
		margin: '0.2em',
	},
};

ReactDOM.render(<App />, document.getElementById('app'));
