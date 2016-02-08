import React from 'react';
import ReactDOM from 'react-dom';

import steps from '../../tests/api-react';

const App = React.createClass({
	getInitialState () {
		return {
			log: [],
			step: 1,
			nextStepContext: {},
		};
	},
	log (msg) {
		this.setState({
			log: this.state.log.concat([
				{ content: msg },
			]),
		});
	},
	handleStepInit () {
		this.setState({
			log: [
				{ content: `Step ${this.state.step} initialised\n` },
			],
		});
	},
	handleStepRun () {
		this.log(`Step ${this.state.step} run\n`);
	},
	handleStepPass (nextStepContext) {
		this.log(`Step ${this.state.step} passed\n`);
		this.setState({
			step: this.state.step + 1,
			stepContext: nextStepContext,
		});
	},
	renderLog () {
		return this.state.log.map((msg, i) => {
			let Tag = msg.tag || 'div';
			return <Tag key={`log${i}`}>{msg.content}</Tag>;
		});
	},
	render () {
		const StepComponent = steps[this.state.step - 1];
		return (
			<div style={{ paddingLeft: 20, paddingRight: 20 }}>
				<div style={styles.box}>
					<StepComponent onInit={this.handleStepInit} onRun={this.handleStepRun} onPass={this.handleStepPass} stepContext={this.state.stepContext} />
				</div>
				<div style={styles.box}>
					{this.renderLog()}
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
