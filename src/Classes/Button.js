class Digit {
	constructor(digit, dataDigit, className) {
		this.digit = digit;
		this.dataDigit = dataDigit;
		this.className = className;
		this.type = 'digit';
	}
}

const digits = [];

let i = 0;
while (i <= 9) {
	const newDigit = new Digit(i, i, 'Button');
	digits.push(newDigit);
	i++;
}

console.log(digits);

class Operator {
	constructor(operator, dataOperator, className, type) {
		this.operator = operator;
		this.dataOperator = dataOperator;
		this.className = className;
		this.type = type;
	}
}

const operators = [];

const multiply = new Operator('x', '*', 'Button', 'operator');
const divided = new Operator('/', '/', 'Button', 'operator');
const addition = new Operator('+', '+', 'Button', 'operator');
const subtraction = new Operator('-', '-', 'Button', 'operator');
const period = new Operator('.', '.', 'Button', 'operator');
const del = new Operator('D', 'D', 'Button yellow', 'operator');
const clear = new Operator('C', 'C', 'Button red', 'operator');
const equal = new Operator('=', '=', 'Button blue', 'operator');

operators.push(multiply);
operators.push(divided);
operators.push(addition);
operators.push(subtraction);
operators.push(period);
operators.push(del);
operators.push(clear);
operators.push(equal);

export default { digits: digits, operators: operators };
