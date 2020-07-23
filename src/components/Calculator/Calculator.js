import React, { Component, Fragment } from 'react';
import './Calculator.scss';

// NOTE: you need a left side and a right side + the current operator

// import my digits and operators classes
import buttons from '../../Classes/Button';

export class Calculator extends Component {
	state = {
		result: '', // current operand and result in general
		history: '' // previous operations concatenated with each other
	};

	//  i work with class properties beside the state because the state does not make change on the value unless the dom is re rendred
	previousOperand = '';
	currentOperand = '';
	opIsDone = false;
	history = '';

	addNumber = num => {
		this.opIsDone = false;
		// period will be added from this function
		if (num === '.' && (this.currentOperand.includes(num) || this.currentOperand === '')) {
			return;
		}

		this.currentOperand += num;

		// update DOM
		this.setState({ result: this.currentOperand });
	};

	clear = () => {
		this.previousOperand = '';
		this.currentOperand = '';
		this.history = '';
		this.opIsDone = false;

		this.setState({
			previousOperand: '',
			currentOperand: '',
			history: '',
			result: ''
		});
	};

	delete = () => {
		let currentOperand = this.currentOperand;

		currentOperand = currentOperand.substring(0, currentOperand.length - 1);

		this.currentOperand = currentOperand;

		this.setState({ result: currentOperand });
	};

	defineOperator = operator => {
		// if last thing is an operator
		if (!this.currentOperand && !this.previousOperand && !this.history) return;
		if (this.opIsDone) return;

		if (this.currentOperand[this.currentOperand.length - 1] === '.') return;

		// if the last word is an operator and the current operand is empty which means need to insert new one after a previos operator, then return to prevent something like >> ++--//
		if (
			[ '+', '-', '*', '/' ].includes(this.state.history[this.state.history.length - 1]) &&
			this.currentOperand === ''
		)
			return;

		if (operator === '=') {
			this.calculate(operator);
			this.previousOperand = '';
			this.currentOperand = '';
			this.opIsDone = false;
			this.history = '';
			this.setState({ history: '' });
			return;
		}

		if (this.currentOperand && this.previousOperand) {
			return this.calculate(operator);
		}

		// update the previous and the history (the ternary operator for strict checking, this code can rone with the code before : only)
		this.previousOperand = this.previousOperand
			? Number(this.previousOperand) + Number(this.currentOperand)
			: Number(this.currentOperand); // this will return 0 if not exist

		this.history = this.history
			? `${this.history}${this.currentOperand}${operator}`
			: `${this.previousOperand}${operator}`;

		this.currentOperand = '';
		this.setState({ history: this.history });
	};

	getLastOperator = () => {
		const history = this.history;

		const lastOperator = history[history.length - 1];

		return lastOperator;
	};

	calculate = nextOperator => {
		const operator = this.getLastOperator(); // we calculate via the last operator

		if (this.currentOperand === '0' && operator === '/') {
			this.opIsDone = true;
			this.currentOperand = '';
			this.setState({ history: this.history, result: 'can`t divide by 0' });
			return;
		}

		if (operator === '+') {
			this.result = Number(this.previousOperand) + Number(this.currentOperand);
			this.history = `${this.history} ${this.currentOperand} ${nextOperator}`;
			this.previousOperand = this.result;
		}

		if (operator === '-') {
			this.result = this.previousOperand - this.currentOperand;
			this.history = `${this.history} ${this.currentOperand} ${nextOperator}`;
			this.previousOperand = this.result;
		}

		if (operator === '*') {
			this.result = this.previousOperand * this.currentOperand;
			this.history = `${this.history} ${this.currentOperand} ${nextOperator}`;
			this.previousOperand = this.result;
		}

		if (operator === '/') {
			this.result = this.previousOperand / this.currentOperand;
			this.history = `${this.history} ${this.currentOperand} ${nextOperator}`;
			this.previousOperand = this.result;
		}

		this.opIsDone = true;
		this.currentOperand = '';
		this.setState({ history: this.history, result: this.result });
	};

	render() {
		console.log(this.currentOperand);
		return (
			<Fragment>
				<h1 style={{ textAlign: 'center', color: 'white' }}>Windows Calculator Clone</h1>
				<div className='container calcWraper'>
					<div id='Calculator'>
						<div id='CalcBoard'>
							<div className='board'>{this.state.history && this.state.history}</div>
							<div className='result'>{this.state.result && this.state.result}</div>
						</div>
						<div className='btns'>
							<div className='digits'>
								{buttons.digits.map((digit, i) => {
									return (
										<div
											key={i}
											className={digit.className}
											onClick={() => this.addNumber(digit.dataDigit)}
										>
											{digit.digit}
										</div>
									);
								})}
								<div />
							</div>
							<div className='controllers'>
								{buttons.operators.map((btn, i) => {
									if (btn.dataOperator === '=') {
										return (
											<div
												key={i}
												className={btn.className}
												onClick={() => this.defineOperator(btn.dataOperator)}
											>
												{btn.operator}
											</div>
										);
									} else if (btn.dataOperator === 'D') {
										return (
											<div key={i} className={btn.className} onClick={this.delete}>
												{btn.operator}
											</div>
										);
									} else if (btn.dataOperator === 'C') {
										return (
											<div key={i} className={btn.className} onClick={this.clear}>
												{btn.operator}
											</div>
										);
									} else if (btn.dataOperator === '.') {
										return (
											<div
												key={i}
												onClick={() => this.addNumber(btn.dataOperator)}
												className={btn.className}
											>
												{btn.operator}
											</div>
										);
									} else {
										// rest of operators >>> + = * /
										return (
											<div
												key={i}
												className={btn.className}
												onClick={() => this.defineOperator(btn.dataOperator)}
											>
												{btn.operator}
											</div>
										);
									}
								})}
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Calculator;
