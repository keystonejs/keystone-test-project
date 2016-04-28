import Domify from 'react-domify';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Row } from 'elemental';

import steps from '../../tests/api-react';

const FIRST_STEP = 1;

function getStepContext (step) {
	const stepIndex = step - 1;
	if (!steps[stepIndex]) return {};
	const stepName = steps[stepIndex].displayName;
	let json = localStorage.getItem(`keystone-test-step-${stepName}`);
	try {
		return JSON.parse(json || '{}');
	} catch (e) {
		console.error(`Could not parse stepContext for ${stepName}:`);
		console.error(json);
		return {};
	}
}

function setStepContext (step, data) {
	const stepIndex = step - 1;
	if (!steps[stepIndex]) return;
	const stepName = steps[stepIndex].displayName;
	console.log('Setting stepContext for ' + stepName);
	localStorage.setItem(`keystone-test-step-${stepName}`, JSON.stringify(data || {}));
}

const App = React.createClass({
	displayName: 'API Test App',
	getInitialState () {
		return {
			log: [],
			step: FIRST_STEP,
			stepComplete: false,
			stepContext: getStepContext(FIRST_STEP),
			stepProgress: 0,
			stepReady: false,
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
	runTest () {
		this.setState({
			stepReady: false,
		});
		this.log(`Step ${this.state.step} running...\n`);
		this.refs.test.runTest();
	},
	stepReady () {
		this.setState({
			stepProgress: this.state.stepProgress + 1,
			stepReady: true,
		}, () => {
			this.log(`Step ${this.state.step} ready\n`);
			ReactDOM.findDOMNode(this.refs.run).focus();
		});
	},
	stepResult () {
		this.log(`Step ${this.state.step} result:\n`);
		for (let i = 0; i < arguments.length; i++) {
			this.log(arguments[i]);
		}
	},
	stepAssert (msg) {
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
			},
		};
	},
	stepComplete (nextStepContext) {
		this.setState({
			stepComplete: true,
		});
		const nextStep = this.state.step + 1;
		setStepContext(nextStep, nextStepContext);
		this.log(`Step ${this.state.step} complete\n`);
	},
	nextStep () {
		const nextStep = this.state.step + 1;
		this.setState({
			log: [],
			step: nextStep,
			stepComplete: false,
			stepContext: getStepContext(nextStep),
			stepProgress: 0,
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
		const canRunTest = this.state.stepReady;
		const canContinue = this.state.stepComplete;
		const runLabel = this.state.stepProgress > 1 ? 'Continue Test' : 'Run Test';
		const StepComponent = steps[this.state.step - 1];
		return (
			<div style={{ paddingLeft: 20, paddingRight: 20 }}>
				<Row>
					<Col sm="1/2">
						<div style={styles.box}>
							<h2 style={{ marginBottom: 0 }}>{StepComponent.displayName}</h2>
							<StepComponent
								assert={this.stepAssert}
								complete={this.stepComplete}
								ready={this.stepReady}
								ref="test"
								result={this.stepResult}
								stepContext={this.state.stepContext}
							/>
							<hr />
							<Row>
								<Col sm="1/2">
									<Button ref="run" type="primary" onClick={this.runTest} disabled={!canRunTest}>{runLabel}</Button>
								</Col>
								<Col sm="1/2" style={{ align: 'right' }}>
									<Button ref="next" type="default" onClick={this.nextStep} disabled={!canContinue} style={{ float: 'right' }}>Next</Button>
								</Col>
							</Row>
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
	},
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
