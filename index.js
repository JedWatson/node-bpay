/**
 * Generates a random integer
 * 
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * 
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */

var getRandomInt = exports.getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


// the array used to generate and validate check digits
// see http://stackoverflow.com/questions/12310837/implementation-of-luhn-algorithm
var luhnArr = [[0,1,2,3,4,5,6,7,8,9],[0,2,4,6,8,1,3,5,7,9]];

/**
 * Generates a valid check digit based on the Luhn algorithm (mod10)
 * 
 * See http://en.wikipedia.org/wiki/Luhn_algorithm
 * 
 * @param  {String} input The number to generate a check digit for
 * @return {Number}
 */

var getLuhnCheckDigit = exports.getLuhnCheckDigit = function(input) {
	
	input = String(input);
	
	var sum = 0;
	
	input.replace(/\D+/g,'').replace(/[\d]/g, function(c, p, o) {
		sum += luhnArr[(o.length-p) & 1][parseInt(c,10)];
	});
	
	return ((10 - sum % 10) % 10);
	
}


/**
 * Validates a string to ensure the check digit is valid
 * 
 * @param  {String} input
 * @return {Boolean}
 */

var validateLuhnCheckDigit = exports.validateLuhnCheckDigit = function(input) {
	
	input = String(input);
	
	return (getLuhnCheckDigit(input.substr(0, input.length - 1)) == input.substr(-1))
	
}


/**
 * Generates a valid BPay Customer Reference Number
 * A BPay CRN is a 2-20 digit number with the last digit a luhn check digit
 * 
 * See http://www.bpay.com.au/Business/Small-Medium-Business/Help/BPAY-Services-FAQs.aspx
 * 
 * @param  {String} len    Length of number to generate (defaults to 10)
 * @param  {String} prefix Prefix to use
 * @return {String}        Valid BPAY CRN
 */

var generateBpayCRN = exports.generateBpayCRN = function(len, prefix) {
	
	var len = Number(len || 10),
		crn = String(prefix || '');
	
	if (len < 2 || len > 20) {
		throw new Error("BPay numbers must be between 2 and 20 digits in length.");
	}
	
	while (crn.length < len - 1) {
		crn = crn + String(getRandomInt(0,9));
	}
	
	return crn + getLuhnCheckDigit(crn);
	
}


/**
 * Validates a BPay Customer Reference Number
 * 
 * @param  {String} input Prefix digits
 * @return {Boolean}
 */

var validateBpayCRN = exports.validateBpayCRN = function(input) {
	
	input = String(input);
	
	return (input.length >= 2 && input.length <= 20 && validateLuhnCheckDigit(input));
	
}
